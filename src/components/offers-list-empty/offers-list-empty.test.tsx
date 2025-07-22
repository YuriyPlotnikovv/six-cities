import {City} from '../../types/offer';
import {cities, citiesLocations} from '../../const/const';
import {render, screen} from '@testing-library/react';
import OffersListEmpty from './offers-list-empty';

describe('Component: OffersListEmpty', () => {
  const city: City = {
    name: cities[0],
    location: citiesLocations[cities[0]]
  };


  it('should render correct', () => {
    render(
      <OffersListEmpty city={city.name}/>
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${city.name}`)).toBeInTheDocument();
  });
});
