import {OfferInfo} from '../../types/offer';
import {AuthorizationStatus, cities, citiesLocations, StoreSlices, SubmitStatus} from '../../const/const';
import {configureStore} from '@reduxjs/toolkit';
import {storeData} from '../../store/slices/storeData/storeData';
import {User} from '../../types/user';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Card from './card';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {capitalizeTextValue} from '../../utils/utils';
import {storeUser} from '../../store/slices/storeUser/storeUser';

const mockStore = (offer: OfferInfo) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreData]: storeData.reducer,
      [StoreSlices.StoreUser]: storeUser.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreData]: {
        offers: [],
        isOffersLoading: false,
        offer: offer,
        isOfferLoading: false,
        nearbyOffers: [],
        reviews: [],
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        commentStatus: SubmitStatus.Still
      },
      [StoreSlices.StoreUser]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      },
    }
  });

describe('Component: Card', () => {
  const mockClasses = {
    cardClass: 'test-card-class',
    imageClass: 'test-img-class',
    infoClass: 'test-info-class',
  };

  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: false,
    email: 'max@gmail.com',
    token: '',
  };

  const offer: OfferInfo = {
    id: 1,
    price: 120,
    rating: 4.0,
    title: 'Offer 1',
    isPremium: true,
    isFavorite: false,
    city: {
      name: cities[0],
      location: citiesLocations[cities[0]]
    },
    location: citiesLocations[cities[0]],
    previewImage: 'img/1.jpg',
    description: 'Nice house',
    type: 'hotel',
    goods: ['dish washer', 'wi-fi'],
    bedrooms: 2,
    host: user,
    maxAdults: 3,
    images: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg']
  };

  it('should render correct', () => {
    render(
      <Provider store={mockStore(offer)}>
        <MemoryRouter>
          <Card classes={mockClasses} offer={offer}/>
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByTestId(`card-${offer.id}`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(mockClasses.cardClass);
    expect(screen.getByRole('img')).toHaveAttribute('src', offer.previewImage);
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(capitalizeTextValue(offer.type))).toBeInTheDocument();
  });

  it('should render Premium label if isPremium', () => {
    render(
      <Provider store={mockStore(offer)}>
        <MemoryRouter>
          <Card classes={mockClasses} offer={{...offer, isPremium: true}}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render Premium label if isPremium is false', () => {
    render(
      <Provider store={mockStore(offer)}>
        <MemoryRouter>
          <Card classes={mockClasses} offer={{...offer, isPremium: false}}/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should call onMouseEnter and onMouseLeave', async () => {
    const onMouseEnterMock = jest.fn();
    const onMouseLeaveMock = jest.fn();
    render(
      <Provider store={mockStore(offer)}>
        <MemoryRouter>
          <Card
            classes={mockClasses}
            offer={offer}
            onMouseEnter={onMouseEnterMock}
            onMouseLeave={onMouseLeaveMock}
          />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByTestId(`card-${offer.id}`);

    await userEvent.hover(card);
    expect(onMouseEnterMock).toHaveBeenCalledWith(offer.id);

    await userEvent.unhover(card);
    expect(onMouseLeaveMock).toHaveBeenCalled();
  });
});
