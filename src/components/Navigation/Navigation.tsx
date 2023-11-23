import { Link, useLocation } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import ButtonNav from '../ButtonNav/ButtonNav';
import { isActiveRoute } from 'src/utils/utils';

interface Props {
  classNameNav?: string;
}
export default function Navigation(props: Props) {
  const location = useLocation();
  const openMessages = isActiveRoute(location.pathname, 'messages');

  const {
    classNameNav = `w-17 border-r ${
      !openMessages ? 'lg:w-56' : ''
    } h-screen overflow-y-hidden fixed top-0 left-0 bottom-0 `
  } = props;

  const Links = [
    { name: 'Home', to: '/', svg: iconsSvg.house, svgActive: iconsSvg.houseFilled },
    {
      name: 'Search',
      to: '/search?type=posts',
      svg: iconsSvg.search,
      svgActive: iconsSvg.searchFilled
    },
    {
      name: 'Messages',
      to: '/messages',
      svg: iconsSvg.message,
      svgActive: iconsSvg.messageFilled
    },
    {
      name: 'Notifications',
      to: '/notifications',
      svg: iconsSvg.notification,
      svgActive: iconsSvg.notificationFilled
    },
    {
      name: 'Profile',
      to: '/profile?type=posts',
      svg: iconsSvg.user,
      svgActive: iconsSvg.user,
      isProfile: true
    }
  ];

  return (
    <nav className={classNameNav}>
      <div className='flex h-full flex-col gap-6 px-3 py-5'>
        <Link to='/' className='flex justify-center py-5'>
          <img
            src={iconsSvg.cloud}
            alt='cloud'
            className={`w-6 ${!openMessages ? 'lg:hidden' : ''}`}
          />
          <p
            className={`hidden ${!openMessages ? 'font-cookie text-5xl text-black lg:block' : ''}`}
          >
            Instacloud
          </p>
        </Link>

        <div className='flex grow flex-col gap-1'>
          {Links.map(link => (
            <ButtonNav
              key={link.name}
              to={link.to}
              svg={link.svg}
              text={link.name}
              svgActive={link.svgActive}
              shorten={openMessages}
              isProfile={link?.isProfile}
            />
          ))}
        </div>

        <ButtonNav
          to='/more'
          svg={iconsSvg.more}
          text='More'
          shorten={openMessages}
          svgActive={iconsSvg.moreFilled}
          isButton
        />
      </div>
    </nav>
  );
}
