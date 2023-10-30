import { Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layouts/AuthLayout';
import ForgotPassword from './pages/Forgot Password';
import ResetPassword from './pages/ResetPassword';
import EmailSetting from './pages/EmailSetting';
import NotFound from './pages/NotFound';

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
          path: '/reset-password',
          element: <ResetPassword />
        }
      ]
    },
    {
      element: (
        <div>
          <Outlet />
        </div>
      ),
      path: 'accounts',
      children: [
        {
          path: 'settings',
          element: <EmailSetting />
        }
      ]
    },
    {
      element: <NotFound />,
      path: '*'
    }
  ]);

  return routeElement;
}
