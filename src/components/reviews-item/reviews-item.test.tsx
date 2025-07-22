import {render, screen} from '@testing-library/react';
import ReviewsItem from './reviews-item';
import {User} from '../../types/user';
import {Review} from '../../types/review';
import {formatDate, getRatingStarsWidthForTest} from '../../utils/utils';

describe('Component: ReviewsItem', () => {
  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: false,
    email: 'max@gmail.com',
    token: '',
  };

  const reviews: Review[] = [
    {
      id: 1,
      comment: 'Nice house!',
      date: '03-07-2025',
      rating: 5.0,
      user
    }
  ];

  const currentReview = reviews[0];

  it('should render correct', () => {
    render(
      <ReviewsItem review={currentReview}/>
    );

    expect(screen.getByText(currentReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(currentReview.comment)).toBeInTheDocument();
    expect(screen.getByText(formatDate(currentReview.date))).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', currentReview.user.avatarUrl);
  });

  it('should render correct rating width', () => {
    render(
      <ReviewsItem review={currentReview}/>
    );

    expect(screen.getByTestId('review-rating-stars')).toHaveStyle(getRatingStarsWidthForTest(currentReview.rating));
  });
});
