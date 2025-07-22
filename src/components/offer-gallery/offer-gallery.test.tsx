import {render, screen} from '@testing-library/react';
import OfferGallery from './offer-gallery';

describe('Component: OfferGallery', () => {
  const images = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];

  it('should render correct', () => {
    render(
      <OfferGallery images={images}/>
    );

    const imagesList = screen.getAllByRole('img');
    expect(imagesList).toHaveLength(images.length);

    images.forEach((image, i) => {
      expect(imagesList[i]).toHaveAttribute('src', image);
    });
  });
});
