import {render, screen} from '@testing-library/react';
import Location from './location';
import {City} from '../../types/offer';
import {configureStore} from '@reduxjs/toolkit';
import {cities, SortingStatus, StoreSlices} from '../../const/const';
import {storeProcesses} from '../../store/slices/storeProcesses/storeProcesses';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

const mockStore = (city: City) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreProcesses]: storeProcesses.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreProcesses]: {
        city: city,
        sorting: SortingStatus.Popular
      },
    },
  });

describe('Component: Location', () => {
  const city = {
    name: cities[3],
    location: {
      latitude: 52,
      longitude: 4,
      zoom: 10
    }
  };

  it('should render correct', () => {
    render(
      <Provider store={mockStore(city)}>
        <MemoryRouter>
          <Location/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(city.name)).toBeInTheDocument();
  });
});
