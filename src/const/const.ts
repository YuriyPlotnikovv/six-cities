import {CityName, Location} from '../types/offer';

export enum StoreSlices {
  StoreData = 'STORE_DATA',
  StoreProcesses = 'STORE_PROCESSES',
  StoreUser = 'STORE_USER',
}

export enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Exit = 'logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '/404',
}

export enum PageClasses {
  Index = 'index',
  Login = 'login',
  Favorites = 'favorites',
  Room = 'property',
  NotFound = 'not-found'
}

export enum HTTPResposes {
  NotFound = 404,
  NoAuth = 401,
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RatingStarsTitle {
  '5-stars' = 'perfect',
  '4-stars' = 'good',
  '3-stars' = 'not bad',
  '2-stars' = 'badly',
  '1-stars' = 'terribly',
}

export enum SortingStatus {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum SubmitStatus {
  Still = 'STILL',
  Pending = 'PENDING',
  Fullfilled = 'FULLFILLED',
  Rejected = 'REJECTED'
}

export const STARS_COUNT = 5;
export const MAX_PERCENT = 100;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_REVIEWS = 10;
export const INVALID_PASSWORD_MESSAGE = 'Password should contains at least one letter and digit';
export const VALID_PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export const citiesLocations: { [key in CityName]: Location } = {
  'Paris': {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  'Cologne': {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  'Brussels': {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  'Amsterdam': {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  'Hamburg': {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  'Dusseldorf': {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  },
};
