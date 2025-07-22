import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correct', () => {
    render(
      <MemoryRouter>
        <Footer/>
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', 'img/logo.svg');
  });
});
