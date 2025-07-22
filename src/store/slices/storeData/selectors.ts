import {MAX_REVIEWS, StoreSlices, SubmitStatus} from '../../../const/const';
import {StoreState} from '../../../types/store';
import {OfferInfo} from '../../../types/offer';
import {Review} from '../../../types/review';
import {getCity, getSorting} from '../storeProcesses/selectors';
import {createSelector} from '@reduxjs/toolkit';
import {SortingList} from '../../../utils/utils';

export const getOffers = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): OfferInfo[] => STORE_DATA.offers;
export const getIsOffersLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isOffersLoading;

export const getOffer = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): OfferInfo | null => STORE_DATA.offer;
export const getIsOfferLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isOfferLoading;

export const getNearbyOffers = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): OfferInfo[] => STORE_DATA.nearbyOffers;

export const getReviews = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): Review[] => STORE_DATA.reviews;
export const selectComments = createSelector(
  [getReviews],
  (reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_REVIEWS)
);
export const getCommentStatus = ({[StoreSlices.StoreData]: SITE_DATA}: StoreState): SubmitStatus => SITE_DATA.commentStatus;

export const getFavoriteOffers = ({[StoreSlices.StoreData]: SITE_DATA}: StoreState): OfferInfo[] => SITE_DATA.favoriteOffers;
export const getIsFavoriteOffersLoading = ({[StoreSlices.StoreData]: SITE_DATA}: StoreState): boolean => SITE_DATA.isFavoriteOffersLoading;

export const selectOffers = createSelector(
  [getOffers, getCity, getSorting],
  (offers, city, sorting) => offers.filter((offer: OfferInfo) => offer.city.name === city.name).sort(SortingList[sorting]),
);
