import {AuthorizationStatus, StoreSlices} from '../../../const/const';
import {StoreState} from '../../../types/store';

export const getAuthorizationStatus = (state: StoreState) => state[StoreSlices.StoreUser].authorizationStatus;
export const getIsAuthorized = (state: StoreState) => state[StoreSlices.StoreUser].authorizationStatus === AuthorizationStatus.Auth;
export const getUser = (state: StoreState) => state[StoreSlices.StoreUser].user;
