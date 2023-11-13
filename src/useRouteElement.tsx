import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layouts/AuthLayout';
import ForgotPassword from './pages/Forgot Password';
import ResetPassword from './pages/ResetPassword';
import EmailSetting from './pages/EmailSetting';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import Messages from './pages/Messages';
import Main from './pages/Main';
import EditProfile from './pages/EditProfile';
import SettingLayout from './layouts/SettingLayout';
import Profile from './pages/Profile';
import NotificationBar from './components/NotificationBar';
import SearchPage from './pages/SearchPage';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Main />
        },
        {
          path: 'messages',
          element: <Messages />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'notifications',
          element: <NotificationBar />
        },
        {
          path: 'search',
          element: <SearchPage />
        },
        {
          path: 'accounts',
          element: <SettingLayout />,
          children: [
            {
              index: true,
              element: (
                <h1 className='flex flex-grow items-center justify-center uppercase tracking-widest text-gray-500'>
                  404 | Not Found
                </h1>
              )
            },
            {
              path: 'notifications',
              element: <EmailSetting />
            },
            {
              path: 'profile',
              element: <EditProfile />
            },
            {
              path: 'emails',
              element: <EmailSetting />
            }
          ]
        }
      ]
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
          // action: loginAction
        },
        {
          path: '/sign-up',
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
    // Handle Not Found page
    {
      element: <NotFound />,
      path: '*'
    }
  ]);

  return routeElement;
}
