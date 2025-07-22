import {render, screen} from '@testing-library/react';
import OfferPrice from './offer-price';

describe('Component: OfferPrice', () => {
  const price = 430;

  it('should render correct', () => {
    render(
      <OfferPrice price={price}/>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
  });
});
