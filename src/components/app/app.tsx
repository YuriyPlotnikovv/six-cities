import Main from '../../pages/main/main';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import Layout from '../layout/layout';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {history} from '../../utils/history';

function App(): JSX.Element {

  return (
    <HistoryRouter history={history}>
      <ScrollToTop/>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.Login} element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
              <Login/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <Favorites/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Room}/:id`}
            element={<Offer/>}
          />
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
