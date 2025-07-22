import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {City, Location} from '../../types/offer';
import {citiesLocations, URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const/const';

const defaultMapMarker = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customMapMarker = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  classes: string;
  city: City;
  locations: (Location & {id?: number})[];
  activeOffer?: null | number;
};

function Map({classes, city, locations, activeOffer}: MapProps): JSX.Element {
  const className = `${classes} map`;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      locations.forEach(({id, latitude: lat, longitude: lng}) => {
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(activeOffer === id ? customMapMarker : defaultMapMarker)
          .addTo(map);
        markers.push(marker);
      });
      const {latitude: lat, longitude: lng} = citiesLocations[city.name];
      map.setView({lat, lng});
    }
    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, city, locations, activeOffer]);

  return (
    <section className={className} ref={mapRef} />
  );
}

export default Map;
