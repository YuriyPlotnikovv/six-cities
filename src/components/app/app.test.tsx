import {AppRoute, AuthorizationStatus, cities, citiesLocations, SortingStatus, StoreSlices} from '../../const/const';
import {createApi} from '../../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import App from './app';
import {render, screen} from '@testing-library/react';
import {history} from '../../utils/history';
import {capitalizeTextValue} from '../../utils/utils';

const user = {
  id: 1,
  name: 'Max',
  avatarUrl: 'img/user-1.jpg',
  isPro: false,
  email: 'max@gmail.com'
};

const offers = [
  {
    id: 1,
    price: 120,
    rating: 4.0,
    title: 'Offer 1',
    isPremium: true,
    isFavorite: true,
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

const reviews = [
  {
    id: 1,
    comment: 'Hello!',
    date: '11-10-2017',
    rating: 1.0,
    user
  }
];

const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument({api})];

mockAPI
  .onGet(`${AppRoute.Room}/1`)
  .reply(200, offers[0]);

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [StoreSlices.StoreUser]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: user.email
  },
  [StoreSlices.StoreProcesses]: {
    sorting: SortingStatus.Popular,
    city: {
      name: cities[0],
      location: citiesLocations[cities[0]]
    }
  },
  [StoreSlices.StoreData]: {
    offers,
    isOffersLoading: false,
    offer: offers[0],
    isOfferLoading: false,
    favoriteOffers: offers,
    isFavoriteOffersLoading: false,
    nearbyOffers: [],
    reviews,
  },
});

const storeNoAuth = mockStore({
  [StoreSlices.StoreUser]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: ''
  },
  [StoreSlices.StoreProcesses]: {
    sorting: SortingStatus.Popular,
    city: {
      name: cities[0],
      location: citiesLocations[cities[0]]
    }
  },
  [StoreSlices.StoreData]: {
    offers,
    isOffersLoading: false,
    offer: offers[0],
    isOfferLoading: false,
    favoriteOffers: offers,
    isFavoriteOffersLoading: false,
    nearbyOffers: [],
    reviews,
  },
});

const mockApp = (
  <Provider store={store}>
    <App/>
  </Provider>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render "Main" when user navigates to "/"', () => {
    history.push(AppRoute.Root);

    render(mockApp);

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText(`1 places to stay in ${cities[0]}`)).toBeInTheDocument();
    expect(screen.getByText(SortingStatus.Popular)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(offers[0].title)).toBeInTheDocument();

  });

  it('should render "Login" when user navigates to "/login"', () => {
    history.push(AppRoute.Login);

    render(
      <Provider store={storeNoAuth}>
        <App/>
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigates to "/favorites"', () => {
    history.push(`${AppRoute.Favorites}`);

    render(mockApp);

    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(capitalizeTextValue(offers[0].type))).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Place image'})).toHaveAttribute('src', offers[0].previewImage);
  });

  it('should render "NotFound" when user navigates to "/404"', () => {
    history.push(`${AppRoute.NotFound}`);

    render(mockApp);

    expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
  });

  it('should render "Offer" when user navigates to "/offer/:id"', () => {
    history.push(`${AppRoute.Room}/1`);

    render(mockApp);

    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(offers[0].description)).toBeInTheDocument();
    expect(screen.getByText(capitalizeTextValue(offers[0].type))).toBeInTheDocument();
  });
});
