import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';
import {fetchOffers, fetchUserStatus} from './actions';
import {api} from '../utils/api';
import {history} from '../utils/history';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        history
      },
    }
  })
});

store.dispatch(fetchUserStatus());
store.dispatch(fetchOffers());
