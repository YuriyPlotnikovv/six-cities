import {User} from '../../types/user';
import {render, screen} from '@testing-library/react';
import OfferHost from './offer-host';

describe('Component: OffersHost', () => {
  const user: User = {
    id: 1,
    name: 'Max',
    avatarUrl: 'img/user-1.jpg',
    isPro: true,
    email: 'max@gmail.com',
    token: '',
  };

  const description = 'Nice house at the mountains!';

  it('should render correct', () => {
    render(
      <OfferHost host={user} description={description}/>
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', user.avatarUrl);
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
