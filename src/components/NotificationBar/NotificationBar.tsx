import { Link } from 'react-router-dom';
import IconProfile from '../IconProfile';
import Button from '../Button';

interface Props {
  className?: string;
  children?: React.ReactNode;
}
export default function NotificationBar({
  className = 'ml-[4.5rem] flex lg:ml-56 bg-white',
  children
}: Props) {
  return (
    <div className={className}>
      <nav className='flex h-screen min-w-fit flex-col border-r'>
        {children}
        <p className='mb-2 ml-9 mr-12 mt-12 text-2xl font-bold text-black'>
          Notifications
        </p>
        <div className='flex gap-2 border-t border-gray-200 pl-9 pt-2'>
          <Button
            typeButton='filter'
            value='all'
            className='w-18 py-2 hover:rounded-full hover:bg-gray-200'
          >
            <span className='text-sm font-semibold text-gray-950'>All</span>
          </Button>

          <Button
            typeButton='filter'
            value='unread'
            className='w-20 py-2 hover:rounded-full hover:bg-gray-200'
          >
            <span className='text-sm font-semibold text-gray-950'>Unread</span>
          </Button>
        </div>
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col gap-1'>
            <div className='flex'>
              <IconProfile
                className='mr-3 h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
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
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>{' '}
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>{' '}
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>{' '}
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>{' '}
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
                </p>
                <span className='font-medium text-blue-500'>6 hours ago</span>
              </div>
            </div>
          </div>
        </Link>{' '}
        <Link to={'#'} className='block w-full hover:bg-gray-50'>
          <div className='mx-9 my-4 flex flex-col justify-center gap-1'>
            <div className='flex items-center'>
              <IconProfile
                className='mr-3 flex h-16 w-16'
                classNameImage='h-16 w-16'
                isImage
              />
              <div className='flex flex-grow flex-col justify-between text-sm font-normal'>
                <p className='w-64'>
                  <span className='font-medium'>TaylorSwitch</span> and{' '}
                  <span className='font-medium'>3 others</span> liked your
                  comment on your post.
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
