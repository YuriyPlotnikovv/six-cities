import CardImage from '../card-image/card-image';
import {OfferInfo} from '../../types/offer';
import CardInfo from '../card-info/card-info';
import {CardClasses} from '../../types/card';

type CardProps = {
  classes: CardClasses;
  offer: OfferInfo;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
}

function Card({classes, offer, onMouseEnter = () => void 0, onMouseLeave = () => void 0}: CardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(offer.id);
  };

  return (
    <article className={`${classes.cardClass} place-card`} data-testid={`card-${offer.id}`} onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
      {
        offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <CardImage imageClass={classes.imageClass} image={offer.previewImage} id={offer.id}/>
      <CardInfo infoClass={classes.infoClass} {...offer}/>
    </article>
  );
}

export default Card;
