import { NavLink, Outlet } from 'react-router-dom';

const Links = [
  { name: 'Edit profile', path: '/accounts/profile' },
  { name: 'Email notification', path: '/accounts/emails' },
  { name: 'Push notifications', path: '/accounts/notifications' }
  // { name: 'Help', path: '/accounts/help' }
];

export default function SettingLayout() {
  return (
    <div className='ml-[4.5rem] flex lg:ml-56'>
      <nav className='flex h-screen w-72 min-w-fit  flex-col border-r'>
        <p className='mb-2 ml-9 mr-12 mt-10 text-xl font-bold text-black'>Settings</p>
        <div className='flex flex-col gap-1'>
          {Links.map(link => (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-gray-200 hover:bg-gray-300' : ''
                } ml-6 mr-10 rounded-md text-gray-950 hover:bg-gray-200 active:text-gray-500`
              }
            >
              <p className='p-3 text-sm font-normal'>{link.name}</p>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className='h-screen flex-grow px-6 py-5'>
        <Outlet />
      </div>
    </div>
  );
}
