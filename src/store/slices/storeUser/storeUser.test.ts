import {storeUser} from './storeUser';
import {AuthorizationStatus} from '../../../const/const';
import {logoutUser, fetchUserStatus, loginUser} from '../../actions';

const email = 'test@test.ru';

describe('Reducer: StoreUser', () => {
  it('should return the initial state', () => {
    expect(storeUser.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
      });
  });

  it('should fetch auth status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: '',
    };

    expect(storeUser.reducer(state, {type: fetchUserStatus.rejected.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
      });

    expect(storeUser.reducer(state, {type: fetchUserStatus.fulfilled.type, payload: {email: email}}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: email,
      });
  });

  it('should login user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: '',
    };

    expect(storeUser.reducer(state, {type: loginUser.fulfilled.type, payload: email}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: email,
      });
  });

  it('should logout user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: email,
    };

    expect(storeUser.reducer(state, {type: logoutUser.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
      });
  });
});
