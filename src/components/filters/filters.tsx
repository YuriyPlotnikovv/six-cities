import {useState} from 'react';
import {SortingName} from '../../types/sort';
import {SortingStatus} from '../../const/const';

type FiltersProps = {
  onChange: (name: SortingName) => void;
  activeSorting: SortingName;
}

function Filters({onChange, activeSorting}: FiltersProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToggleButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const handleSortingItemClick = (name: SortingName) => {
    setIsOpened(true);
    onChange(name);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggleButtonClick}>
        {SortingStatus[activeSorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        isOpened && (
          <ul className="places__options places__options--custom places__options--opened">
            {
              (Object.entries(SortingStatus) as [SortingName, SortingStatus][]).map(([name, title]) => (
                <li key={name} className={`places__option${name === activeSorting ? ' places__option--active' : ''}`} tabIndex={0}
                  onClick={() => {
                    handleSortingItemClick(name);
                    handleToggleButtonClick();
                  }}
                >
                  {title}
                </li>
              ))
            }
          </ul>
        )
      }
    </form>
  );
}

export default Filters;
