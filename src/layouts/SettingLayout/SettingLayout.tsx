import { NavLink, Outlet } from 'react-router-dom';

const Links = [
  { name: 'Edit profile', path: '/accounts/profile' },
  { name: 'Push notifications', path: '/accounts/notifications' },
  {
    name: 'Who can see your content',
    path: '/accounts/who_can_see_your_content'
  }
  // { name: 'Help', path: '/accounts/help' }
];

export default function SettingLayout() {
  return (
    <div className='ml-[4.5rem] flex lg:ml-56'>
      <nav className='flex h-screen w-52 flex-col border-r md:w-72'>
        <p className='mb-2 ml-9 mr-12 mt-10 text-xl font-bold text-black'>
          Settings
        </p>
        <div className='flex flex-col gap-1'>
          {Links.map(link => (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-gray-200 hover:bg-gray-300' : ''
                } ml-6 mr-10 rounded-md text-gray-950 hover:bg-gray-200 active:text-gray-500`
              }
              key={link.path}
            >
              <p className='p-3 text-sm font-normal'>{link.name}</p>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className='h-screen flex-grow overflow-y-auto overflow-x-hidden p-0 md:p-10'>
        <Outlet />
      </div>
    </div>
  );
}
