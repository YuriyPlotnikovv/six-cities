import {render, screen} from '@testing-library/react';
import CardPrice from './card-price';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {AuthorizationStatus, StoreSlices} from '../../const/const';
import {storeUser} from '../../store/slices/storeUser/storeUser';

const mockStore = () =>
  configureStore({
    reducer: {
      [StoreSlices.StoreUser]: storeUser.reducer,
    },
    preloadedState: {
      [StoreSlices.StoreUser]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      },
    }
  });

describe('Component: CardPrice', () => {
  const card = {
    id: 22,
    price: 350,
    isFavorite: true
  };

  it('should render correct', () => {
    render(
      <Provider store={mockStore()}>
        <CardPrice id={card.id} price={card.price} isFavorite={card.isFavorite}/>
      </Provider>
    );

    expect(screen.getByText(`€${card.price}`)).toBeInTheDocument();
  });
});
