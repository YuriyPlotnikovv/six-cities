import {City} from '../types/offer';
import {cities, citiesLocations} from '../const/const';
import {render, renderHook, screen} from '@testing-library/react';
import useMap from './useMap';
import {Map} from 'leaflet';

describe('Hook: useMap', () => {
  const MockComponent = () => <div data-testid="mock-component"></div>;

  const city: City = {
    name: cities[0],
    location: citiesLocations[cities[0]]
  };

  it('should return map', () => {
    render(
      <MockComponent/>
    );

    const container = screen.getByTestId('mock-component');
    expect(container).toBeEmptyDOMElement();

    const {result} = renderHook(() =>
      useMap({current: container}, city),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
    expect(container).not.toBeEmptyDOMElement();
  });
});
