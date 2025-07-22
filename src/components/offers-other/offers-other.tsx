import {CardClasses} from '../../types/card';
import Card from '../card/card';
import {OfferInfo} from '../../types/offer';

type OffersOtherProps = {
  offers: OfferInfo[];
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
};

function OffersOther({
  offers,
  onMouseEnter = () => void 0,
  onMouseLeave = () => void 0
}: OffersOtherProps): JSX.Element {
  const classes: CardClasses = {
    cardClass: 'near-places__card',
    imageClass: 'near-places__image-wrapper',
    infoClass: ''
  };

  const handleMouseEnter = (id: number) => {
    onMouseEnter(id);
  };


  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {
            offers.map((offer) => (
              <Card key={offer.id}
                classes={classes}
                offer={offer}
                onMouseEnter={() => handleMouseEnter(offer.id)}
                onMouseLeave={onMouseLeave}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default OffersOther;
