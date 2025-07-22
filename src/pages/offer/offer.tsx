import {Helmet} from 'react-helmet';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Reviews from '../../components/reviews/reviews';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferPrice from '../../components/offer-price/offer-price';
import OfferFacilities from '../../components/offer-facilities/offer-facilities';
import OfferHost from '../../components/offer-host/offer-host';
import OffersOther from '../../components/offers-other/offers-other';
import Map from '../../components/map/map';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import Loader from '../../components/loader/loader';
import {fetchNearbyOffers, fetchOffer, fetchReviews} from '../../store/actions';
import {getIsOfferLoading, getNearbyOffers, getOffer} from '../../store/slices/storeData/selectors';
import Bookmark from '../../components/bookmark/bookmark';

function Offer(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const mapClass = 'property__map';

  const handleCardMouseEnter = (id: number) => {
    setActiveOffer(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  useEffect(() => {
    const {id} = params;
    if (id) {
      const currentId = Number(id);
      dispatch(fetchOffer(currentId));
      dispatch(fetchReviews(currentId));
      dispatch(fetchNearbyOffers(currentId));
    }
  }, [params, dispatch]);

  if (isOfferLoading) {
    return <Loader/>;
  }

  if (!offer) {
    return null;
  }

  const {
    id,
    images,
    isPremium,
    title,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    city,
    location
  } = offer;

  const locations = nearbyOffers.map(({
    id: nearbyId,
    location: nearbyLocation,
  }) => ({id: nearbyId, ...nearbyLocation}));
  locations.push({id, ...location});

  return (
    <>
      <Helmet>
        <title>Offer - 6 cities</title>
      </Helmet>
      <section className="property">
        <OfferGallery images={images}/>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">{title}</h1>
              <Bookmark classes="property" id={id} isFavorite={isFavorite}/>
            </div>
            <OfferRating rating={rating}/>
            <OfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults}/>
            <OfferPrice price={price}/>
            <OfferFacilities facilities={goods}/>
            <OfferHost host={host} description={description}/>
            <Reviews id={id}/>
          </div>
        </div>

        <Map classes={mapClass} city={city} locations={locations} activeOffer={activeOffer}/>
      </section>

      <OffersOther offers={nearbyOffers} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}/>
    </>
  );
}

export default Offer;
