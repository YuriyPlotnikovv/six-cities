import {render, screen} from '@testing-library/react';
import Reviews from './reviews';
import {configureStore} from '@reduxjs/toolkit';
import {User} from '../../types/user';
import {Review} from '../../types/review';
import {AuthorizationStatus, cities, citiesLocations, StoreSlices, SubmitStatus} from '../../const/const';
import {Provider} from 'react-redux';
import {storeData} from '../../store/slices/storeData/storeData';
import {OfferInfo} from '../../types/offer';
import {storeUser} from '../../store/slices/storeUser/storeUser';

const mockStore = (offers: OfferInfo[], reviews: Review[], authorizationStatus = AuthorizationStatus.NoAuth) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreData]: storeData.reducer,
      [StoreSlices.StoreUser]: storeUser.reducer
    },
    preloadedState: {
      [StoreSlices.StoreData]: {
        offers: offers,
        isOffersLoading: false,
        offer: offers[0],
        isOfferLoading: false,
        nearbyOffers: [],
        reviews: reviews,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        commentStatus: SubmitStatus.Still,
      },
      [StoreSlices.StoreUser]: {
        user: '',
        authorizationStatus: authorizationStatus
      },
    },
  });

describe('Component: Reviews', () => {
  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: false,
    email: 'max@gmail.com',
    token: '',
  };

  const reviews: Review[] = [
    {
      id: 1,
      comment: 'Nice house!',
      date: '03-07-2025',
      rating: 5.0,
      user
    }
  ];

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
    render(
      <Provider store={mockStore(offers, reviews)}>
        <Reviews id={offers[0].id}/>
      </Provider>
    );

    expect(screen.getByRole('heading', {level: 2, name: /reviews/i})).toBeInTheDocument();

    reviews.forEach((review: Review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
    });
  });

  it('should not render form when not authorized', () => {
    render(
      <Provider store={mockStore(offers, reviews, AuthorizationStatus.NoAuth)}>
        <Reviews id={offers[0].id}/>
      </Provider>
    );

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('should render form when authorized', () => {
    render(
      <Provider store={mockStore(offers, reviews, AuthorizationStatus.Auth)}>
        <Reviews id={offers[0].id}/>
      </Provider>
    );

    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
  });
});
