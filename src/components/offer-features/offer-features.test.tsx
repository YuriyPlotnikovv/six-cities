import {render, screen} from '@testing-library/react';
import OfferFeatures from './offer-features';

describe('Component: OfferFeatures', () => {
  const features = {
    type: 'Room',
    bedrooms: 3,
    maxAdults: 4,
  };

  it('should render correct', () => {
    render(
      <OfferFeatures type={features.type} bedrooms={features.bedrooms} maxAdults={features.maxAdults}/>
    );

    expect(screen.getByText(features.type)).toBeInTheDocument();
    expect(screen.getByText(`${features.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${features.maxAdults} adults`)).toBeInTheDocument();
  });
});
