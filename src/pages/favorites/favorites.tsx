import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {OfferInfo} from '../../types/offer';
import {CardClasses} from '../../types/card';
import {AppRoute} from '../../const/const';
import Card from '../../components/card/card';
import {useAppSelector} from '../../hooks/store';
import {getFavoriteOffers, getIsFavoriteOffersLoading} from '../../store/slices/storeData/selectors';
import Loader from '../../components/loader/loader';

function Favorites(): JSX.Element {
  const isFavoriteOffersLoading = useAppSelector(getIsFavoriteOffersLoading);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupFavoritesByCity = favoriteOffers.reduce<{ [key: string]: OfferInfo[] }>((acc, curr) => {
    if (curr.isFavorite) {
      const city = curr.city.name;

      if (!(city in acc)) {
        acc[city] = [];
      }

      acc[city].push(curr);
    }

    return acc;
  }, {});

  const classes: CardClasses = {
    cardClass: 'favorites__card',
    imageClass: 'favorites__image-wrapper',
    infoClass: 'favorites__card-info'
  };

  if (isFavoriteOffersLoading) {
    return <Loader/>;
  }

  const isEmpty = favoriteOffers.length === 0;

  if (isEmpty) {
    return (
      <>
        <Helmet>
          <title>Favorites - 6 cities</title>
        </Helmet>
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Favorites - 6 cities</title>
        </Helmet>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {
                Object.entries(groupFavoritesByCity).map(([city, groupedOffers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link to={AppRoute.Root} className="locations__item-link">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        groupedOffers.map((offer) => (
                          <Card key={offer.id}
                            classes={classes}
                            offer={offer}
                          />
                        ))
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </>
    );
  }
}

export default Favorites;
