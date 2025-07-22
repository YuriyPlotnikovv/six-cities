import Filters from '../filters/filters';
import Card from '../card/card';
import Map from '../map/map';
import {useState} from 'react';
import {CardClasses} from '../../types/card';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {SortingName} from '../../types/sort';
import {setSorting} from '../../store/slices/storeProcesses/storeProcesses';
import Loader from '../loader/loader';
import {getCity, getSorting} from '../../store/slices/storeProcesses/selectors';
import {getIsOffersLoading, selectOffers} from '../../store/slices/storeData/selectors';

function OffersList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSorting = useAppSelector(getSorting);
  const activeCity = useAppSelector(getCity);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const offers = useAppSelector(selectOffers);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const handleCardMouseEnter = (id: number) => {
    setActiveOffer(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  const onSortingChange = (name: SortingName) => {
    dispatch(setSorting(name));
  };

  const classes: CardClasses = {
    cardClass: 'cities__place-card',
    imageClass: 'cities__image-wrapper',
    infoClass: ''
  };

  const mapClass = 'cities__map';

  if (isOffersLoading) {
    return <Loader/>;
  }

  const isEmpty = offers.length === 0;

  if (isEmpty) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in {activeCity.name}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
            <Filters onChange={onSortingChange} activeSorting={activeSorting}/>
            <div className="cities__places-list places__list tabs__content">
              {
                offers.map((offer) => (
                  <Card key={offer.id}
                    classes={classes}
                    offer={offer}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  />
                ))
              }
            </div>
          </section>

          <div className="cities__right-section">
            <Map classes={mapClass} locations={offers.map(({id, location}) => ({id, ...location}))} city={activeCity}
              activeOffer={activeOffer}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OffersList;
