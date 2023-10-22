import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='relative mx-auto h-[44rem] w-screen'>
      <div className='absolute left-1/2 top-1/2 flex w-1/3 -translate-x-1/2 -translate-y-1/2 flex-col'>
        <Outlet />
      </div>
    </div>
  );
}
