import {OfferInfo} from '../../types/offer';
import {AuthorizationStatus, cities, citiesLocations, StoreSlices, SubmitStatus} from '../../const/const';
import {configureStore} from '@reduxjs/toolkit';
import {storeData} from '../../store/slices/storeData/storeData';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OffersOther from './offers-other';
import {Provider} from 'react-redux';
import {User} from '../../types/user';
import {MemoryRouter} from 'react-router-dom';
import {storeUser} from '../../store/slices/storeUser/storeUser';

const mockStore = (offers: OfferInfo[]) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreData]: storeData.reducer,
      [StoreSlices.StoreUser]: storeUser.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreData]: {
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        nearbyOffers: offers,
        reviews: [],
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        commentStatus: SubmitStatus.Still
      },
      [StoreSlices.StoreUser]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      },
    },
  });

describe('Component: OffersOther', () => {
  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: false,
    email: 'max@gmail.com',
    token: '',
  };

  const offers: OfferInfo[] = [
    {
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
    }
  ];

  it('should render correct', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(
      <Provider store={mockStore(offers)}>
        <MemoryRouter>
          <OffersOther offers={offers} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', {level: 2, name: /Other places in the neighbourhood/})).toBeInTheDocument();

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('mouse events should be called correct', async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(
      <Provider store={mockStore(offers)}>
        <MemoryRouter>
          <OffersOther offers={offers} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByTestId(`card-${offers[0].id}`);

    await userEvent.hover(card);
    expect(onMouseEnter).toHaveBeenCalledWith(offers[0].id);

    await userEvent.unhover(card);
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
