import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot Password';
import ResetPassword from './pages/ResetPassword';
import EmailSetting from './pages/EmailSetting';
import NotFound from './pages/NotFound';
import Messages from './pages/Messages';
import Main from './pages/Main';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import SearchPage from './pages/SearchPage';
import YourContent from './pages/YourContent';

import NotificationBar from './components/NotificationBar';

import MainLayout from './layouts/MainLayout';
import SettingLayout from './layouts/SettingLayout';
import AuthLayout from './layouts/AuthLayout';
import Slogan from './components/Slogan';
import Conversation from './components/Conversation';

const isAuthenticated = true;
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: path.login,
              element: <Login />
              // action: loginAction
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
          ]
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
                  path: ':id',
                  element: <Conversation />
                }
              ]
            },
            {
              path: path.profile,
              element: <Profile />
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
                }
              ]
            }
          ]
        }
      ]
    },

    // Handle Not Found page
    {
      element: <NotFound />,
      path: path.all
    }
  ]);

  return routeElement;
}
