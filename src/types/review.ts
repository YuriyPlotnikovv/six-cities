import {User} from './user';
import {OfferInfo} from './offer';

export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type ReviewAuth = Pick<Review, 'comment' | 'rating'> & Pick<OfferInfo, 'id'>;
