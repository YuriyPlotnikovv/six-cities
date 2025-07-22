import {render, screen} from '@testing-library/react';
import CardImage from './card-image';
import {MemoryRouter} from 'react-router-dom';

describe('Component: CardImage', () => {
  const image = {
    id: 1,
    image: 'img/1.jpg',
    imageClass: 'card-image',
  };

  it('should render correct', () => {
    render(
      <MemoryRouter>
        <CardImage {...image} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', image.image);
  });
});
