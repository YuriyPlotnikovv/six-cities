import {capitalizeTextValue, pluralizeTextValue} from '../../utils/utils';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

function OfferFeatures({type, bedrooms, maxAdults}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {capitalizeTextValue(type)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {bedrooms} {pluralizeTextValue('Bedroom', bedrooms)}
      </li>
      <li className="property__feature property__feature--adults">
        Max {maxAdults} {pluralizeTextValue('adult', maxAdults)}
      </li>
    </ul>
  );
}

export default OfferFeatures;
