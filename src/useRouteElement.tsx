import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layouts/AuthLayout';
import ForgotPassword from './pages/Forgot Password';
// import { loginAction } from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: <Login />
          // action: loginAction
        },
        {
          path: '/signup',
          element: <Register />
        },
        {
          path: '/forgot-password',
          element: <ForgotPassword />
        },
        {
          path: '/resset-password',
          element: <ResetPassword />
        }
      ]
    }
  ]);

  return routeElement;
}
