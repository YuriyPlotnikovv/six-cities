import CardPrice from '../card-price/card-price';
import CardRating from '../card-rating/card-rating';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {capitalizeTextValue} from '../../utils/utils';

type CardInfoProps = {
  infoClass?: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  id: number;
  title: string;
  type: string;
}

function CardInfo({infoClass, price, isFavorite, rating, id, title, type}: CardInfoProps): JSX.Element {
  const className = infoClass ? `${infoClass} place-card__info` : 'place-card__info';

  return (
    <div className={className}>
      <CardPrice id={id} price={price} isFavorite={isFavorite}/>
      <CardRating rating={rating}/>
      <h2 className="place-card__name">
        <Link to={`${AppRoute.Room}/${id}`}>
          {title}
        </Link>
      </h2>
      <p className="place-card__type">{capitalizeTextValue(type)}</p>
    </div>
  );
}

export default CardInfo;
