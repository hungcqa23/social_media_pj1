import { Link } from 'react-router-dom';
import IconProfile from '../IconProfile';

export default function NotificationBar() {
  return (
    <div className='ml-[4.5rem] flex lg:ml-56'>
      <nav className='flex h-screen min-w-fit flex-col border-r'>
        <p className='mb-2 ml-9 mr-12 mt-12 text-2xl font-bold text-black'>Notifications</p>
        <div className='ml-9'>
          <button className='mr-3 h-10 w-18 rounded-full border border-gray-300'>
            <span className='text-sm font-medium text-gray-500'>All</span>
          </button>

          <button className='h-10 w-18 rounded-full border bg-gray-300'>
            <span className='text-sm font-medium text-gray-500'>Unread</span>
          </button>
        </div>

        <Link to={'#'} className='block w-full'>
          <div className='mx-9 mt-4 flex flex-col gap-1'>
            <div className='flex'>
              <IconProfile className='mr-3 h-16 w-16' classNameImage='h-16 w-16' />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'#'} className='block w-full'>
          <div className='mx-9 mt-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile className='mr-3 flex h-16 w-16' classNameImage='h-16 w-16' />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>
      </nav>
    </div>
  );
}
