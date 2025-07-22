import {AppRoute, AuthorizationStatus} from '../../const/const';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store';
import {getAuthorizationStatus} from '../../store/slices/storeUser/selectors';
import Loader from '../loader/loader';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({restrictedFor, redirectTo, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader/>;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo}/>
  );
}

export default PrivateRoute;
