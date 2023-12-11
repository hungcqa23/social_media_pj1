import {
  Navigate,
  Outlet,
  type RouteObject,
  useRoutes
} from 'react-router-dom';
import { lazy } from 'react';
import path from './constants/path';

// import MainLayout from './layouts/MainLayout';
import SettingLayout from './layouts/SettingLayout';
import AuthLayout from './layouts/AuthLayout';

import Slogan from './components/Slogan';
import Conversation from './components/Conversation';

import { useAppContext } from './contexts/app.contexts';
import Login from './pages/Login';
import BlockedAccount from './pages/BlockedAccount';
import SearchPage from './pages/SearchPage';
import NotificationBar from './components/NotificationBar';
import Messages from './pages/Messages';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
// import Register from './pages/Register';
import Main from './pages/Main';
import EmailSetting from './pages/EmailSetting';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import YourContent from './pages/YourContent';
// import NotFound from './pages/NotFound';

// const Login = lazy(() => import('./pages/Login'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
// const Main = lazy(() => import('./pages/Main'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  },
  {
    path: path.forgot_password,
    element: <ForgotPassword />
  },
  {
    path: path.reset_password,
    element: <ResetPassword />
  }
];

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: AuthRouteChildren
        }
      ]
    },
    // Main Layout
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: path.home,
              element: <Main />
            },
            {
              path: path.messages,
              element: <Messages />,
              children: [
                {
                  element: <Slogan />,
                  index: true
                },
                {
                  path: path.id,
                  element: <Conversation />
                }
              ]
            },
            {
              path: path.notifications,
              element: <NotificationBar />
            },
            {
              path: path.search,
              element: <SearchPage />
            },
            {
              path: path.accounts,
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
                  path: path.notifications,
                  element: <EmailSetting />
                },
                {
                  path: path.profile,
                  element: <EditProfile />
                },
                {
                  path: path.emails,
                  element: <EmailSetting />
                },
                {
                  path: path.who_can_see_your_content,
                  element: <YourContent />
                },
                {
                  path: path.blocked_accounts,
                  element: <BlockedAccount />
                }
              ]
            },
            {
              path: '/:username',
              element: <Profile />,
              children: [
                {
                  index: true,
                  element: <p>Hello World!</p>
                },
                {
                  path: ':type',
                  element: <p>Hello World!</p>
                }
              ]
            }
          ]
        }
      ]
    },
    // Handle Not Found page
    {
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      ),
      path: path.all
    }
  ]);

  return routeElement;
}
