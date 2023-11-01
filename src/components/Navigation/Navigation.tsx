import { Link, NavLink, useLocation } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import ButtonNav from '../ButtonNav/ButtonNav';
import MainLayout from 'src/layouts/MainLayout';

interface Props {
  classNameNav?: string;
}
export default function Navigation(props: Props) {
  const openMessages = useLocation().pathname === '/messages';
  const {
    classNameNav = `w-17 border-r ${
      !openMessages ? 'lg:w-56' : ''
    } h-screen overflow-y-hidden fixed top-0 left-0 bottom-0 `
  } = props;
  const Links = [
    { name: 'Home', to: '/home' },
    { name: 'Search', to: '/search' },
    { name: 'Notifications', to: '/notifications' },
    { name: 'Messages', to: '/messages' },
    { name: 'Bookmarks', to: '/bookmarks' },
    { name: 'Lists', to: '/lists' },
    { name: 'Profile', to: '/profile' },
    { name: 'More', to: '/more' }
  ];

  return (
    <nav className={classNameNav}>
      <div className='flex h-full flex-col gap-6 px-3 py-5'>
        <Link to='/home' className='flex justify-center py-5'>
          <img
            src={iconsSvg.cloud}
            alt='cloud'
            className={`w-6 ${!openMessages ? 'lg:hidden' : ''}`}
          />
          <p className={`hidden ${!openMessages ? 'lg:block' : ''}`}>Home</p>
        </Link>

        <div className='flex grow flex-col gap-1'>
          {/* <ButtonNav to='/' svg={homeSvg} text='Home' /> */}
          <ButtonNav
            to='/home'
            svg={iconsSvg.home}
            text='Home'
            svgActive={iconsSvg.homeFilled}
            shorten={openMessages}
          />
          <ButtonNav
            to='/search'
            svg={iconsSvg.search}
            text='Search'
            svgActive={iconsSvg.searchFilled}
            shorten={openMessages}
          />
          <ButtonNav
            to='/messages'
            svg={iconsSvg.message}
            text='Messages'
            svgActive={iconsSvg.messageFilled}
            shorten={openMessages}
          />
          <ButtonNav
            to='/notification'
            svg={iconsSvg.notification}
            text='Notification'
            svgActive={iconsSvg.notificationFilled}
            shorten={openMessages}
          />
          <ButtonNav
            to='/profile'
            svg={iconsSvg.user}
            text='Profile'
            svgActive={iconsSvg.user}
            shorten={openMessages}
            isProfile={true}
          />
        </div>

        <ButtonNav
          to='/more'
          svg={iconsSvg.more}
          text='More'
          shorten={openMessages}
          svgActive={iconsSvg.moreFilled}
        />
      </div>
    </nav>
  );
}
