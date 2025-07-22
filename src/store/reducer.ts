import {StoreSlices} from '../const/const';
import {combineReducers} from '@reduxjs/toolkit';
import {storeData} from './slices/storeData/storeData';
import {storeProcesses} from './slices/storeProcesses/storeProcesses';
import {storeUser} from './slices/storeUser/storeUser';

export const rootReducer = combineReducers({
  [StoreSlices.StoreData]: storeData.reducer,
  [StoreSlices.StoreProcesses]: storeProcesses.reducer,
  [StoreSlices.StoreUser]: storeUser.reducer,
});
