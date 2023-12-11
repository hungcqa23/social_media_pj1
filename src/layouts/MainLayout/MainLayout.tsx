import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from 'src/components/NavigationBar';

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Suspense
        fallback={
          <div
            className='inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-400'
            role='status'
            aria-label='loading'
          />
        }
      >
        <Navigation />
      </Suspense>
      {children}
      <Outlet />
    </>
  );
}
