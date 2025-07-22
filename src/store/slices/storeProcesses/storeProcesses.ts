import {StoreProcesses} from '../../../types/store';
import {cities, citiesLocations, SortingStatus, StoreSlices} from '../../../const/const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityName} from '../../../types/offer';
import {SortingName} from '../../../types/sort';

const initialState: StoreProcesses = {
  city: {
    name: cities[0],
    location: citiesLocations[cities[0]]
  },
  sorting: SortingStatus.Popular,
};

export const storeProcesses = createSlice({
  name: StoreSlices.StoreProcesses,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = {
        name: action.payload,
        location: citiesLocations[action.payload]
      };
    },
    setSorting: (state, action: PayloadAction<SortingName>) => {
      state.sorting = action.payload;
    },
  }
});

export const {setCity, setSorting} = storeProcesses.actions;
