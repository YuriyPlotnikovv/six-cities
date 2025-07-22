import Header from '../header/header';
import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../footer/footer';
import {AppRoute, PageClasses} from '../../const/const';
import {useAppSelector} from '../../hooks/store';
import {getFavoriteOffers, selectOffers} from '../../store/slices/storeData/selectors';

function Layout(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const favoritesOffers = useAppSelector(getFavoriteOffers);

  const { pathname } = useLocation() as { pathname: AppRoute };

  const getMainClass = (): string => {
    switch (true) {
      case pathname === '/':
        return PageClasses.Index;
      case pathname.startsWith('/login'):
        return PageClasses.Login;
      case pathname.startsWith('/favorites'):
        return PageClasses.Favorites;
      case pathname.startsWith('/not-found'):
        return PageClasses.NotFound;
      case pathname.startsWith('/offer'):
        return PageClasses.Room;
      default:
        return '';
    }
  };

  const PageClass: Record<AppRoute, string> = {
    [AppRoute.Root]: 'page--gray page--main',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Favorites]: favoritesOffers.length === 0 ? 'page--favorites-empty' : '',
    [AppRoute.Room]: '',
    [AppRoute.NotFound]: '',
  };

  let emptyClass = '';
  if (offers.length === 0 && pathname === '/') {
    emptyClass = ' page__main--index-empty';
  } else if (favoritesOffers.length === 0 && pathname === '/favorites') {
    emptyClass = ' page__main--favorites-empty';
  }

  return (
    <div className={`page ${PageClass[pathname]}`}>
      <Header/>

      <main className={`page__main page__main--${getMainClass()}${emptyClass}`}>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  );
}

export default Layout;
