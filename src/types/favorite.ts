import {OfferInfo} from './offer';

export type FavoriteAuth = Pick<OfferInfo, 'id'> & {status: 1 | 0}
