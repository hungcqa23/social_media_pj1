import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function YourContent() {
  useEffect(() => {
    document.title = 'Who can see your content ☁️';
  }, []);

  return (
    <>
      <h1 className='mb-6 mt-8 text-2xl font-normal text-gray-900'>Who can see your content</h1>
      <div className='border-b border-t py-4'>
        <p className='mb-2 text-base font-medium text-gray-900'>Blocked accounts</p>
        <Link to='accounts/blocked_account' className='text-sm font-medium text-blue-500'>
          See and manage accounts you've blocked
        </Link>
      </div>
    </>
  );
}
