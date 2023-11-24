import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';

export default function YourContent() {
  useEffect(() => {
    const originalTitle = document.title;

    document.title = 'Who can see your content ☁️';

    return () => {
      document.title = originalTitle; // Reset the document title on component unmount
    };
  }, []);

  return (
    <>
      <h1 className='mb-6 mt-8 text-2xl font-normal text-gray-900'>Who can see your content</h1>
      <div className='border-b border-t py-4'>
        <p className='mb-2 text-base font-medium text-gray-900'>Blocked accounts</p>
        <Link
          to={`/accounts/${path.blocked_accounts}`}
          className='text-sm font-medium text-blue-500'
        >
          See and manage accounts you&apos;ve blocked
        </Link>
      </div>
    </>
  );
}
