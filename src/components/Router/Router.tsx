import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import ErrorMessage from '../../pages/ErrorMessage/ErrorMessage';
import Layout from '../../layouts/Layout';
import MainPage from '../../pages/MainPage/MainPage';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<Layout />} errorElement={<ErrorMessage />}>
        <Route path="" element={<Navigate to={'/main?page=1&limit=10'} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default Router;
