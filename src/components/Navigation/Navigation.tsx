import { Link, useLocation } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import ButtonNav from '../ButtonNav/ButtonNav';
import { isActiveRoute } from 'src/utils/utils';
import Popover from '../Popover';
import { useMutation } from '@tanstack/react-query';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import { clearLS } from 'src/utils/auth';

interface Props {
  classNameNav?: string;
}
export default function Navigation(props: Props) {
  const location = useLocation();
  const openMessages = isActiveRoute(location.pathname, 'messages');

  const { setIsAuthenticated } = useAppContext();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
    },
    onError: () => {
      window.location.reload();
      clearLS();
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const {
    classNameNav = `w-17 border-r ${
      !openMessages ? 'lg:w-56' : ''
    } h-screen overflow-y-hidden fixed top-0 left-0 bottom-0 `
  } = props;

  const Links = [
    {
      name: 'Home',
      to: '/',
      svg: iconsSvg.house,
      svgActive: iconsSvg.houseFilled
    },
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
      to: '/anhungwindyy?type=posts',
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
            className={`hidden ${
              !openMessages ? 'font-cookie text-5xl text-black lg:block' : ''
            }`}
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

        <Popover
          hasArrow={false}
          placement='top-start'
          renderPopover={
            <div className='rounded-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)]'>
              <div className='p-2'>
                <ButtonNav
                  text='Setting'
                  svg={iconsSvg.setting}
                  to='/accounts/profile'
                />
                {/* <ButtonNav isButton text='Your activity' /> */}
                <ButtonNav
                  to='/anhungwindyy?type=saved'
                  text='Saved'
                  svg={iconsSvg.saved}
                />
              </div>
              <div className='flex w-full justify-center border-t py-2'>
                <ButtonNav
                  isButton
                  text='Log out'
                  svg={iconsSvg.logout}
                  onClick={handleLogout}
                />
              </div>
            </div>
          }
          className='w-max'
        >
          <ButtonNav
            svg={iconsSvg.more}
            text='More'
            shorten={openMessages}
            svgActive={iconsSvg.moreFilled}
            isButton
          />
        </Popover>
      </div>
    </nav>
  );
}
