import Navigation from 'src/components/Navigation/Navigation';
import Search from 'src/components/Search';

interface Props {
  children: React.ReactNode;
}
export default function MainLayout(props: Props) {
  const { children } = props;
  return (
    <div className='flex'>
      <Navigation />
      {children}
    </div>
  );
}
