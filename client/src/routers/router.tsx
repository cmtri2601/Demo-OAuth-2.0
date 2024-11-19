import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import Content from 'pages/Content';
import Login from 'pages/Login';

const createRouter = () => {
  const isLogin = localStorage.getItem('access_token') !== null;
  console.log(isLogin);

  // default public route
  const unprotectedRoute = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    }
  ];

  // check state before show page
  if (!isLogin) {
    // haven't login yet
    return createBrowserRouter(unprotectedRoute);
  } else {
    // have login
    const protectedRoute = [
      {
        path: '/content',
        element: <Content />
      }
    ];
    return createBrowserRouter([...unprotectedRoute, ...protectedRoute]);
  }
};

const router = createRouter();

export default router;
