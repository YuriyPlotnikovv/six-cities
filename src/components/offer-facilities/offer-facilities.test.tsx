import {render, screen} from '@testing-library/react';
import OfferFacilities from './offer-facilities';

describe('Component: OffersFacilities', () => {
  const facilities = ['Facility1', 'Facility2', 'Facility3', 'Facility4'];

  it('should render correct', () => {
    render(
      <OfferFacilities facilities={facilities}/>
    );

    facilities.forEach((facility) => {
      expect(screen.getByText(facility)).toBeInTheDocument();
    });
  });
});
