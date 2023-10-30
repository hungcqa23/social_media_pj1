import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='relative mx-auto h-[44rem] w-screen'>
      <div className='absolute left-1/2 top-1/2 flex w-1/3 min-w-fit max-w-md -translate-x-1/2 -translate-y-1/2 flex-col'>
        <div className='max-w-md p-4 sm:p-7'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
