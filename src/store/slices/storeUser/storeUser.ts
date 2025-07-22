import {StoreUser} from '../../../types/store';
import {AuthorizationStatus, StoreSlices} from '../../../const/const';
import {createSlice} from '@reduxjs/toolkit';
import {logoutUser, fetchUserStatus, loginUser} from '../../actions';

const initialState: StoreUser = {
  user: '',
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const storeUser = createSlice({
  name: StoreSlices.StoreUser,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.user = action.payload.email;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
