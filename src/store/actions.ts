import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferInfo} from '../types/offer';
import {ApiRoute, AppRoute, HTTPResposes} from '../const/const';
import {User, UserAuth} from '../types/user';
import {Extra} from '../types/store';
import {Token} from '../utils/token';
import {AxiosError} from 'axios';
import {Review, ReviewAuth} from '../types/review';
import {FavoriteAuth} from '../types/favorite';

export const Action = {
  SET_CITY: 'city/set',
  SET_SORTING: 'sorting/set',
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offers/fetch-current',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_REVIEWS: 'offers/fetch-reviews',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  POST_FAVORITE: 'offers/post-favorite',
  FETCH_USER_STATUS: 'user/fetch-status',
  POST_REVIEW: 'offer/post-review',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
};

export const fetchOffers = createAsyncThunk<OfferInfo[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<OfferInfo[]>(ApiRoute.Offers);

    return data;
  }
);

export const fetchOffer = createAsyncThunk<OfferInfo, OfferInfo['id'], { extra: Extra }>(
  Action.FETCH_OFFER,
  async (id, {extra}) => {
    const {api, history} = extra;
    try {
      const {data} = await api.get<OfferInfo>(`${ApiRoute.Offers}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HTTPResposes.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<OfferInfo[], OfferInfo['id'], { extra: Extra }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<OfferInfo[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const fetchReviews = createAsyncThunk<Review[], OfferInfo['id'], { extra: Extra }>(
  Action.FETCH_REVIEWS,
  async (id, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  }
);

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<User>(ApiRoute.Login);

    return data;
  }
);

export const postReview = createAsyncThunk<Review[], ReviewAuth, { extra: Extra }>(
  Action.POST_REVIEW,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Review[]>(`${ApiRoute.Comments}/${id}`, { comment, rating });

    return data;
  });

export const fetchFavoriteOffers = createAsyncThunk<OfferInfo[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferInfo[]>(ApiRoute.Favorites);

    return data;
  });

export const postFavorite = createAsyncThunk<OfferInfo, FavoriteAuth, { extra: Extra }>(
  Action.POST_FAVORITE,
  async ({ id, status }, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.post<OfferInfo>(`${ApiRoute.Favorites}/${id}/${status}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HTTPResposes.NoAuth) {
        history.push(AppRoute.Login);
      }

      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({email, password}, {extra}) => {
    const {api, history} = extra;
    const {data} = await api.post<User>(ApiRoute.Login, {email, password});
    const {token} = data;

    Token.set(token);
    history.push(AppRoute.Root);

    return email;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, {extra}) => {
    const {api, history} = extra;
    await api.delete<User>(ApiRoute.Exit);

    Token.remove();
    history.push(AppRoute.Root);
  }
);
