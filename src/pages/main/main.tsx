import {Helmet} from 'react-helmet';
import Tabs from '../../components/tabs/tabs';
import OffersList from '../../components/offers-list/offers-list';

function Main(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <Tabs/>
      <OffersList />
    </>
  );
}

export default Main;
