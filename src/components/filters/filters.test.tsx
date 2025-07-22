import {SortingName} from '../../types/sort';
import {SortingStatus} from '../../const/const';
import {render, screen, within} from '@testing-library/react';
import Filters from './filters';
import userEvent from '@testing-library/user-event';

describe('Component: Filters', () => {
  const onChangeMock = jest.fn();
  const activeSorting: SortingName = SortingStatus.Popular;

  beforeEach(() => onChangeMock.mockClear());

  it('should render correct', () => {
    render(
      <Filters onChange={onChangeMock} activeSorting={activeSorting}/>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(SortingStatus[activeSorting])).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should open sorting list on click', async () => {
    render(
      <Filters onChange={onChangeMock} activeSorting={activeSorting}/>
    );

    await userEvent.click(screen.getByText(SortingStatus[activeSorting]));

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    Object.values(SortingStatus).forEach((title) => {
      expect(within(list).getByText(title)).toBeInTheDocument();
    });
  });

  it('should call onChange with sorting name on option click', async () => {
    render(
      <Filters onChange={onChangeMock} activeSorting={activeSorting}/>
    );

    await userEvent.click(screen.getByText(SortingStatus[activeSorting]));

    const sortingList = Object.keys(SortingStatus) as SortingName[];
    const anotherSorting = sortingList.find((key) => key !== activeSorting) || sortingList[0];

    await userEvent.click(screen.getByText(SortingStatus[anotherSorting]));
    expect(onChangeMock).toHaveBeenCalledWith(anotherSorting);
  });
});
