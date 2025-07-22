import {render, screen} from '@testing-library/react';
import CardInfo from './card-info';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {capitalizeTextValue} from '../../utils/utils';
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

describe('Component: CardInfo', () => {
  const offer = {
    infoClass: '',
    price: 350,
    isFavorite: true,
    rating: 4.3,
    id: 12,
    title: 'Test room',
    type: 'apartment',
  };

  it('should render correct', () => {
    render(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <CardInfo {...offer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(capitalizeTextValue(offer.type))).toBeInTheDocument();
    const link = screen.getByRole('link', {name: offer.title});
    expect(link).toHaveAttribute('href', `/offer/${offer.id}`);
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });
});
