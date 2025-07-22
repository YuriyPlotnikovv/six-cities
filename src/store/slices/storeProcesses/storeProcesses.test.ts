import {setCity, setSorting, storeProcesses} from './storeProcesses';
import {cities, citiesLocations, SortingStatus} from '../../../const/const';
import {SortingName} from '../../../types/sort';
import {SortingList} from '../../../utils/utils';

describe('Reducer: StoreProcesses', () => {
  it('should return initial state', () => {
    expect(storeProcesses.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: {
          name: cities[0],
          location: citiesLocations[cities[0]]
        },
        sorting: SortingStatus.Popular,
      });
  });

  it('should set city by a given name', () => {
    const state = {
      city: {
        name: cities[0],
        location: citiesLocations[cities[0]]
      },
      sorting: SortingStatus.Popular as SortingName,
    };

    expect(storeProcesses.reducer(state, setCity(cities[1])))
      .toEqual({
        city: {
          name: cities[1],
          location: citiesLocations[cities[1]]
        },
        sorting: SortingStatus.Popular,
      });
  });

  it('should set sorting by a given name', () => {
    const state = {
      city: {
        name: cities[0],
        location: citiesLocations[cities[0]]
      },
      sorting: SortingStatus.Popular as SortingName,
    };

    expect(storeProcesses.reducer(state, setSorting(Object.keys(SortingList)[1] as SortingName)))
      .toEqual({
        city: {
          name: cities[0],
          location: citiesLocations[cities[0]]
        },
        sorting: Object.keys(SortingList)[1] as SortingName,
      });
  });
});
