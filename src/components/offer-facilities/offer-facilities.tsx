type OfferFacilitiesProps = {
  facilities: string[];
}

function OfferFacilities({facilities}: OfferFacilitiesProps): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          facilities.map((item: string, key: number) => (
            <li className="property__inside-item" key={item}>
              {item}
            </li>))
        }
      </ul>
    </div>
  );
}

export default OfferFacilities;
