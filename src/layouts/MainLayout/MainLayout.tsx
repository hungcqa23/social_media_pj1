import { Outlet } from 'react-router-dom';
import Navigation from 'src/components/NavigationBar';

interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      {children}
      <Outlet />
    </>
  );
}
