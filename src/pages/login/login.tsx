import {Helmet} from 'react-helmet';
import LoginForm from '../../components/login-form/login-form';
import Location from '../../components/location/location';

function Login(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Login - 6 cities</title>
      </Helmet>
      <div className="page__login-container container">
        <LoginForm/>
        <Location/>
      </div>
    </>
  );
}

export default Login;
