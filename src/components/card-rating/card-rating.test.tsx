import {render, screen} from '@testing-library/react';
import CardRating from './card-rating';
import {getRatingStarsWidthForTest} from '../../utils/utils';

describe('Component: CardRating', () => {
  const rating = 4.3;

  it('should render correct', () => {
    render(
      <CardRating rating={rating}/>
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByTestId('card-rating-stars')).toHaveStyle(getRatingStarsWidthForTest(rating));
  });
});
