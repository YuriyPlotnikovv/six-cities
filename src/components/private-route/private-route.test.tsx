import {AppRoute, AuthorizationStatus, cities, SortingStatus, StoreSlices} from '../../const/const';
import {configureStore} from '@reduxjs/toolkit';
import {storeUser} from '../../store/slices/storeUser/storeUser';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import PrivateRoute from './private-route';
import {MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';
import Login from '../../pages/login/login';
import {storeProcesses} from '../../store/slices/storeProcesses/storeProcesses';

const mockStore = (authorizationStatus = AuthorizationStatus.NoAuth) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreUser]: storeUser.reducer,
      [StoreSlices.StoreProcesses]: storeProcesses.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreUser]: {
        user: '',
        authorizationStatus: authorizationStatus,
      },
      [StoreSlices.StoreProcesses]: {
        city: {
          name: cities[3],
          location: {
            latitude: 52,
            longitude: 4,
            zoom: 10
          }
        },
        sorting: SortingStatus.Popular
      },
    }
  });

function LocationSpy() {
  useLocation();
  return null;
}

describe('Component: PrivateRoute', () => {
  const testChild = <div data-testid="private-child">SECRET PAGE</div>;

  it('should render loader when unknown auth', () => {
    render(
      <Provider store={mockStore(AuthorizationStatus.Unknown)}>
        <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
          {testChild}
        </PrivateRoute>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render private route when auth', () => {
    render(
      <Provider store={mockStore(AuthorizationStatus.Auth)}>
        <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
          {testChild}
        </PrivateRoute>
      </Provider>
    );

    expect(screen.getByTestId('private-child')).toBeInTheDocument();
  });

  it('should redirect to login when no auth', () => {
    render(
      <Provider store={mockStore(AuthorizationStatus.NoAuth)}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={<PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>{testChild}</PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          <LocationSpy/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('private-child')).not.toBeInTheDocument();
  });
});
