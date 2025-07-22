import {Link} from 'react-router-dom';
import type { MouseEvent } from 'react';
import {AppRoute, cities} from '../../const/const';
import {useAppDispatch} from '../../hooks/store';
import {CityName} from '../../types/offer';
import {setCity} from '../../store/slices/storeProcesses/storeProcesses';
import {getRandomElement} from '../../utils/utils';

function Location(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    const cityName = evt.currentTarget.textContent as CityName;
    dispatch(setCity(cityName));
  };

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Root} onClick={handleLinkClick}>
          <span>{getRandomElement<CityName>(cities)}</span>
        </Link>
      </div>
    </section>
  );
}

export default Location;
