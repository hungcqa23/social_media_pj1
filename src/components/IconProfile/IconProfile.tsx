import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  classNameImage?: string;
  to?: string;
  src?: string;
}
export default function IconProfile(props: Props) {
  const {
    className = 'h-11 w-11',
    classNameImage = 'h-11 w-11',
    src = '/src/assets/images/user.jpg',
    to = '/'
  } = props;

  return (
    <Link to={to} className={className}>
      <img src={src} alt='Profile User' className={'rounded-full object-cover ' + classNameImage} />
    </Link>
  );
}
