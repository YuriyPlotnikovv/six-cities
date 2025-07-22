import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {getIsAuthorized, getUser} from '../../store/slices/storeUser/selectors';
import {logoutUser} from '../../store/actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getIsAuthorized);
  const user = useAppSelector(getUser);

  const handleButtonClick = () => {
    if (authorizationStatus) {
      dispatch(logoutUser());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus && (
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user}</span>
                    </Link>
                  </li>
                )
              }
              <li className="header__nav-item">
                {
                  authorizationStatus
                    ? <div className="header__nav-link" role="button" onClick={handleButtonClick}>Sign Out</div>
                    : <Link to={AppRoute.Login} className="header__nav-link"><span className="header__signout">Sign in</span></Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
