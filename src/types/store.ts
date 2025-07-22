import {store} from '../store';
import {AxiosInstance} from 'axios';
import {History} from 'history';
import {City, OfferInfo} from './offer';
import {Review} from './review';
import {SortingName} from './sort';
import {User} from './user';
import {AuthorizationStatus, SubmitStatus} from '../const/const';

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type StoreData = {
  offers: OfferInfo[];
  isOffersLoading: boolean;
  offer: OfferInfo | null;
  isOfferLoading: boolean;
  nearbyOffers: OfferInfo[];
  reviews: Review[];
  favoriteOffers: OfferInfo[];
  isFavoriteOffersLoading: boolean;
  commentStatus: SubmitStatus;
}

export type StoreProcesses = {
  city: City;
  sorting: SortingName;
}

export type StoreUser = {
  user: User['email'];
  authorizationStatus: AuthorizationStatus;
}

export type Extra = {
  api: AxiosInstance;
  history: History;
}
