import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';

type CardImageProps = {
  imageClass: string;
  image: string;
  id: number;
}

function CardImage({imageClass, image, id}: CardImageProps): JSX.Element {
  return (
    <div className={`${imageClass} place-card__image-wrapper`}>
      <Link to={`${AppRoute.Room}/${id}`}>
        <img className="place-card__image" src={image} width="260" height="200" alt=""/>
      </Link>
    </div>
  );
}

export default CardImage;
