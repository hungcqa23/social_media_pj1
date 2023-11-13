import { Link } from 'react-router-dom';
import Profile from '../IconProfile';
import SuggestedList from '../SuggestedList';

export default function Suggested() {
  return (
    <div className='hidden w-96 flex-col pl-16 xl:flex'>
      <div className='mt-9 flex flex-col gap-6'>
        <div className='flex items-center gap-4 px-4'>
          <Profile />
          <div className='flex flex-col'>
            <Link to='/profile' className='text-sm font-semibold'>
              anhungwindyy
            </Link>
            <p className='text-base font-normal leading-4 text-gray-500'>An Hưng</p>
          </div>
        </div>

        <SuggestedList />
      </div>
    </div>
  );
}
