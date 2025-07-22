type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({images}: OfferGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          images.map((image, key) => (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt=""/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default OfferGallery;
