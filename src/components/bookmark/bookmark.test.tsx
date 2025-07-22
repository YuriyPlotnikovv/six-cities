import {render, screen} from '@testing-library/react';
import Bookmark from './bookmark';
import userEvent from '@testing-library/user-event';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const/const';

type StoreUserState = { authorizationStatus: AuthorizationStatus };

const mockStore = (authStatus: AuthorizationStatus) =>
  configureStore({
    reducer: {
      STORE_USER: (state: StoreUserState = {authorizationStatus: authStatus}): StoreUserState => state,
    },
    preloadedState: {
      STORE_USER: {authorizationStatus: authStatus},
    }
  });

describe('Component: Bookmark', () => {
  const bookmark = {
    classes: 'place-card',
    id: 11,
  };

  it('should render correct with inactive (unauthorized)', () => {
    render(
      <Provider store={mockStore(AuthorizationStatus.NoAuth)}>
        <Bookmark classes={bookmark.classes} id={bookmark.id} isFavorite={false}/>
      </Provider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button', 'button');
    // В неавторизованном варианте active класс не должен быть!
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });

  it('should render correct with active (authorized)', () => {
    render(
      <Provider store={mockStore(AuthorizationStatus.Auth)}>
        <Bookmark classes={bookmark.classes} id={bookmark.id} isFavorite/>
      </Provider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByText(/From bookmarks/i)).toBeInTheDocument();
  });

  it('should dispatch for inactive', async () => {
    const store = mockStore(AuthorizationStatus.Auth);
    const dispatch = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <Bookmark classes={bookmark.classes} id={bookmark.id} isFavorite={false}/>
      </Provider>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch for active', async () => {
    const store = mockStore(AuthorizationStatus.Auth);
    const dispatch = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <Bookmark classes={bookmark.classes} id={bookmark.id} isFavorite/>
      </Provider>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(dispatch).toHaveBeenCalled();
  });
});
