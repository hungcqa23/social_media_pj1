import { Link } from 'react-router-dom';
import { useAppContext } from 'src/contexts/app.contexts';

interface Props {
  className?: string;
  classNameImage?: string;
  to?: string;
  src?: string;
  isImage?: boolean;
  onClick?: () => void;
}
export default function IconProfile(props: Props) {
  const { profile } = useAppContext();
  const {
    className = 'h-11 w-11',
    classNameImage = 'h-full w-full',
    src = '/src/assets/images/user.jpg',
    to = `${profile?._id}`,
    isImage,
    onClick
  } = props;

  if (isImage) {
    return (
      <div className={'block shrink-0 ' + className}>
        <img
          src={src}
          alt='Profile User'
          className={'rounded-full object-cover ' + classNameImage}
        />
      </div>
    );
  }

  return (
    <Link to={to} className={'block shrink-0 ' + className} onClick={onClick}>
      <img
        src={src}
        alt='Profile User'
        className={'rounded-full object-cover ' + classNameImage}
      />
    </Link>
  );
}
