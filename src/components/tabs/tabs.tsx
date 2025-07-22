import {cities} from '../../const/const';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {CityName} from '../../types/offer';
import {setCity} from '../../store/slices/storeProcesses/storeProcesses';
import TabsItem from '../tabs-item/tabs-item';
import {getCity} from '../../store/slices/storeProcesses/selectors';
import {useCallback} from 'react';

function Tabs(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const handleClick = useCallback((name: CityName) => {
    dispatch(setCity(name));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((locationName) => (
              <TabsItem key={locationName} name={locationName} active={locationName === activeCity.name} onClick={handleClick}/>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
