import {render, screen} from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render corrrect', () => {
    render(
      <Loader/>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
