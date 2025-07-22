import {CityName} from '../../types/offer';
import {memo} from 'react';

type TabsItemProps = {
  name: CityName;
  active: boolean;
  onClick: (name: CityName) => void;
}

function TabsItem({name, active, onClick}: TabsItemProps) {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <li className="locations__item" onClick={handleClick}>
      <div className={`locations__item-link tabs__item${active ? ' tabs__item--active' : ''}`} role="button">
        <span>{name}</span>
      </div>
    </li>
  );
}

export default memo(TabsItem);
