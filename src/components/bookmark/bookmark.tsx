import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {postFavorite} from '../../store/actions';
import {getIsAuthorized} from '../../store/slices/storeUser/selectors';

type BookmarkProps = {
  classes: string;
  id: number;
  isFavorite: boolean;
}

function Bookmark({classes, id, isFavorite}: BookmarkProps): JSX.Element {
  const authorizationStatus = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(postFavorite({
      id,
      status: isFavorite ? 0 : 1
    }));
  };

  const setFavoriteClass = (): string => `${isFavorite && authorizationStatus ? ` ${classes}__bookmark-button--active` : ''}`;

  return (
    <button className={`${classes}__bookmark-button button${setFavoriteClass()}`} type="button"
      onClick={handleButtonClick}
    >
      <svg className={`${classes}__bookmark-icon`} width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite && authorizationStatus ? 'From' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
