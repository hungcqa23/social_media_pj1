import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import path from 'src/constants/path';

const Links = [
  { name: 'Edit profile', path: '/accounts/profile' },
  { name: 'Push notifications', path: '/accounts/notifications' },
  {
    name: 'Who can see your content',
    path: '/accounts/who_can_see_your_content'
  }
];

export default function SettingLayout() {
  return (
    <div className='ml-[4.5rem] flex lg:ml-56'>
      <nav className='flex h-screen w-52 flex-col border-r md:w-72'>
        <p className='mb-2 ml-9 mr-12 mt-10 text-lg font-bold text-black'>
          Settings
        </p>

        <span className='my-2 ml-9 text-xs font-medium text-gray-500'>
          How you use instagram
        </span>
        <div className='flex flex-col gap-1'>
          {Links.map(link => (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                classNames(
                  `ml-6 mr-10 rounded-md text-black active:text-gray-500`,
                  {
                    'bg-neutral-100 hover:bg-neutral-200': isActive,
                    'hover:bg-neutral-100 ': !isActive
                  }
                )
              }
              key={link.path}
            >
              <p className='p-3 text-sm font-normal'>{link.name}</p>
            </NavLink>
          ))}
        </div>

        <span className='my-2 mb-2 ml-9 text-xs font-medium text-gray-500'>
          More info and support
        </span>
        <NavLink
          to={`${path.account_password}`}
          className={({ isActive }) =>
            classNames(
              `ml-6 mr-10 rounded-md text-black active:text-gray-500`,
              {
                'bg-neutral-100 hover:bg-neutral-200': isActive,
                'hover:bg-neutral-100 ': !isActive
              }
            )
          }
        >
          <p className='p-3 text-sm font-normal'>Account Password</p>
        </NavLink>

        <span className='my-2 ml-9 text-xs font-medium text-gray-500'>
          Who can see your content
        </span>
        <NavLink
          to={`${path.blocked_accounts}`}
          className={({ isActive }) =>
            classNames(
              `ml-6 mr-10 rounded-md text-black active:text-gray-500`,
              {
                'bg-neutral-100 hover:bg-neutral-200': isActive,
                'hover:bg-neutral-100': !isActive
              }
            )
          }
        >
          <p className='p-3 text-sm font-normal'>Blocked</p>
        </NavLink>
      </nav>

      <div className='h-screen flex-grow overflow-y-auto overflow-x-hidden p-0 md:p-10'>
        <Outlet />
      </div>
    </div>
  );
}
