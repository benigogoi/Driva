import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import DriverRegistration from './pages/DriverRegistration';
import Contact from './pages/Contact';
import ScrollToTop from '../src/components/common/ScrollToTop';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'book',
        element: <BookingPage />,
      },
      {
        path: 'join',
        element: <DriverRegistration />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

// Router component to be used in main.tsx
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;