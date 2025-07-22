import {render, screen} from '@testing-library/react';
import LoginForm from './login-form';
import userEvent from '@testing-library/user-event';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const mockStore = () =>
  configureStore({
    reducer: () => ({}),
  });

describe('Component: LoginForm', () => {
  it('should render form fields', () => {
    render(
      <Provider store={mockStore()}>
        <LoginForm/>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should dispatch loginUser with form data on submit', async () => {
    const store = mockStore();
    const dispatch = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secretPASS');
    await userEvent.click(screen.getByRole('button', {name: /sign in/i}));

    expect(dispatch).toHaveBeenCalled();
  });
});
