import {StoreSlices} from '../../../const/const';
import {StoreState} from '../../../types/store';

export const getCity = (state: StoreState) => state[StoreSlices.StoreProcesses].city;
export const getSorting = (state: StoreState) => state[StoreSlices.StoreProcesses].sorting;
