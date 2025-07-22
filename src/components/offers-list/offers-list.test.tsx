import {
  AuthorizationStatus,
  cities,
  citiesLocations,
  SortingStatus,
  StoreSlices,
  SubmitStatus
} from '../../const/const';
import {storeData} from '../../store/slices/storeData/storeData';
import {storeProcesses} from '../../store/slices/storeProcesses/storeProcesses';
import {OfferInfo} from '../../types/offer';
import {User} from '../../types/user';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import OffersList from './offers-list';
import {configureStore} from '@reduxjs/toolkit';
import {SortingName} from '../../types/sort';
import {storeUser} from '../../store/slices/storeUser/storeUser';

const mockStore = (offers: OfferInfo[], isOffersLoading: boolean, city = cities[0], sorting: SortingName = SortingStatus.Popular) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreData]: storeData.reducer,
      [StoreSlices.StoreProcesses]: storeProcesses.reducer,
      [StoreSlices.StoreUser]: storeUser.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreData]: {
        offers: offers,
        isOffersLoading: isOffersLoading,
        offer: offers[0],
        isOfferLoading: false,
        nearbyOffers: [],
        reviews: [],
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        commentStatus: SubmitStatus.Still
      },
      [StoreSlices.StoreProcesses]: {
        city: {
          name: city,
          location: citiesLocations[city],
        },
        sorting: sorting
      },
      [StoreSlices.StoreUser]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      },
    }
  });

describe('Component: OffersList', () => {
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

  it('should show loader when loading', () => {
    render(
      <Provider store={mockStore(offers, true)}>
        <MemoryRouter>
          <OffersList/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show empty state when no offers', () => {
    render(
      <Provider store={mockStore([], false, cities[0])}>
        <MemoryRouter>
          <OffersList/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${cities[0]}`)).toBeInTheDocument();
  });

  it('should render correct', () => {
    render(
      <Provider store={mockStore(offers, false, cities[0])}>
        <MemoryRouter>
          <OffersList/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${offers.length} places to stay in ${cities[0]}`)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
  });
});
