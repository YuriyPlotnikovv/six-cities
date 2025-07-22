import Bookmark from '../bookmark/bookmark';

type CardPriceProps = {
  id: number;
  price: number;
  isFavorite: boolean;
}


function CardPrice({id, price, isFavorite}: CardPriceProps): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <Bookmark classes="place-card" id={id} isFavorite={isFavorite}/>
    </div>
  );
}

export default CardPrice;
