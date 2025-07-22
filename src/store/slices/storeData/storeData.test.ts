import {OfferInfo} from '../../../types/offer';
import {cities, citiesLocations, SubmitStatus} from '../../../const/const';
import {User} from '../../../types/user';
import {Review} from '../../../types/review';
import {storeData} from './storeData';
import {
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  fetchReviews,
  postFavorite,
  postReview
} from '../../actions';

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

const reviews: Review[] = [
  {
    id: 1,
    comment: 'Nice house!',
    date: '03-07-2025',
    rating: 5.0,
    user
  }
];

describe('Reducer: StoreData', () => {
  it('should return the initial state', () => {
    expect(storeData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(state, {type: fetchOffers.pending.type}))
      .toEqual({
        offers: [],
        isOffersLoading: true,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchOffers.fulfilled.type, payload: offers}))
      .toEqual({
        offers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchOffers.rejected.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch offer', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(state, {type: fetchOffer.pending.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: true,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchOffer.fulfilled.type, payload: offers[0]}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: offers[0],
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchOffer.rejected.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch favorite offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(undefined, {type: fetchFavoriteOffers.pending.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: true,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchFavoriteOffers.fulfilled.type, payload: offers[0]}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: offers[0],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: fetchFavoriteOffers.rejected.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch nearby offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(state, {type: fetchNearbyOffers.fulfilled.type, payload: offers}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: offers,
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch reviews', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Fullfilled,
    };

    expect(storeData.reducer(state, {type: fetchReviews.fulfilled.type, payload: reviews}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: reviews,
        commentStatus: SubmitStatus.Fullfilled,
      });
  });

  it('should post review', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(state, {type: postReview.pending.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Pending,
      });

    expect(storeData.reducer(state, {type: postReview.fulfilled.type, payload: reviews}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: reviews,
        commentStatus: SubmitStatus.Fullfilled,
      });

    expect(storeData.reducer(state, {type: postReview.rejected.type}))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Rejected,
      });
  });

  it('should post favorite', () => {
    const state = {
      offers: offers,
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [] as OfferInfo[],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      reviews: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(storeData.reducer(state, {type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: true}}))
      .toEqual({
        offers: [{...offers[0], isFavorite: true}],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [{...offers[0], isFavorite: true}],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(storeData.reducer(state, {type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: false}}))
      .toEqual({
        offers: offers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        reviews: [],
        commentStatus: SubmitStatus.Still,
      });
  });
});
