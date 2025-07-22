import {AuthorizationStatus, StoreSlices} from '../../const/const';
import {configureStore} from '@reduxjs/toolkit';
import {storeUser} from '../../store/slices/storeUser/storeUser';
import {render, screen} from '@testing-library/react';
import Header from './header';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {User} from '../../types/user';

const mockStore = (user: User['email'], authorizationStatus: AuthorizationStatus) =>
  configureStore({
    reducer: {
      [StoreSlices.StoreUser]: storeUser.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreUser]: {
        user: user,
        authorizationStatus: authorizationStatus,
      }
    }
  });

describe('Component: Header', () => {
  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: false,
    email: 'max@gmail.com',
    token: '',
  };

  it('should render login link when no authorization', () => {
    render(
      <Provider store={mockStore('', AuthorizationStatus.NoAuth)}>
        <MemoryRouter>
          <Header/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render logout link when authorization', () => {
    render(
      <Provider store={mockStore(user.email, AuthorizationStatus.Auth)}>
        <MemoryRouter>
          <Header/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});
