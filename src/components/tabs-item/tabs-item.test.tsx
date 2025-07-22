import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabsItem from './tabs-item';
import {cities} from '../../const/const';

describe('Component: TabsItem', () => {
  it('should render correct', () => {
    const onClick = jest.fn();

    render(
      <TabsItem name={cities[0]} active onClick={onClick}/>
    );

    expect(screen.getByText(cities[0])).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('tabs__item--active');
  });

  it('onClick should be called when user has chosen a city', async () => {
    const onClick = jest.fn();

    render(
      <TabsItem name={cities[0]} active={false} onClick={onClick}/>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toBeCalledWith(cities[0]);
  });
});
