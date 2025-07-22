import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Not Found - 6 cities</title>
      </Helmet>
      <div className="page__not-found-container container">
        <h1 className="">404 - Page not found</h1>
        <p className="">The page you are looking for has been lost in space.</p>
        <Link to="/">Go to the Main</Link>
      </div>
    </>
  );
}

export default NotFound;
