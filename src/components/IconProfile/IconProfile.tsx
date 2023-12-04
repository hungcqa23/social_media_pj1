import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from 'src/contexts/app.contexts';

interface Props {
  className?: string;
  classNameImage?: string;
  to?: string;
  src?: string;
  isImage?: boolean;
}
export default function IconProfile(props: Props) {
  const {
    className = 'h-11 w-11',
    classNameImage = 'h-full w-full',
    src = '/src/assets/images/user.jpg',
    to = '/',
    isImage
  } = props;

  if (isImage) {
    return (
      <div className={'block ' + className}>
        <img
          src={src}
          alt='Profile User'
          className={'rounded-full object-cover ' + classNameImage}
        />
      </div>
    );
  }

  return (
    <Link to={to} className={'block ' + className}>
      <img
        src={src}
        alt='Profile User'
        className={'rounded-full object-cover ' + classNameImage}
      />
    </Link>
  );
}
