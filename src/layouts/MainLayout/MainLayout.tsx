import { Outlet } from 'react-router-dom';
import Navigation from 'src/components/Navigation';

export default function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
