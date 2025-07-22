import {render, screen} from '@testing-library/react';
import OfferRating from './offer-rating';

describe('Component: OfferRating', () => {
  const rating = 4.4;

  it('should render correct', () => {
    render(
      <OfferRating rating={rating}/>
    );

    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
  });
});
