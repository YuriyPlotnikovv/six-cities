import Tabs from './tabs';
import {render, screen} from '@testing-library/react';
import {cities, citiesLocations, SortingStatus, StoreSlices} from '../../const/const';
import {configureStore} from '@reduxjs/toolkit';
import {storeProcesses} from '../../store/slices/storeProcesses/storeProcesses';
import {Provider} from 'react-redux';
import {CityName} from '../../types/offer';

const mockStore = (initCity: CityName = cities[0]) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreProcesses]: storeProcesses.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreProcesses]: {
        city: {
          name: initCity,
          location: citiesLocations[initCity]
        },
        sorting: SortingStatus.Popular
      },
    },
  });

describe('Component: Tabs', () => {
  it('should render correct', () => {
    render(
      <Provider store={mockStore()}>
        <Tabs/>
      </Provider>
    );

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should correct set active tab', () => {
    const activeCity = cities[3];

    render(
      <Provider store={mockStore(activeCity)}>
        <Tabs/>
      </Provider>
    );

    const activeTab = screen.getByRole('button', {name: activeCity});
    expect(activeTab).toHaveClass('tabs__item--active');
  });
});
