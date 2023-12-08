import { Link, useLocation } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import ButtonNav from '../ButtonNav/ButtonNav';
import { isActiveRoute } from 'src/utils/utils';
import Popover from '../Popover';
import { useMutation } from '@tanstack/react-query';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import { clearLS } from 'src/utils/auth';
import NotificationBar from '../NotificationBar';

import { useId, useState } from 'react';
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating
} from '@floating-ui/react';

interface Props {
  classNameNav?: string;
}

interface LinkProps {
  name: string;
  to: string;
  svg: string;
  svgActive?: string;
  isButton?: boolean;
  className?: string;
  type?: string;
  isProfile?: boolean;
  onClick?: () => void;
}
export default function Navigation(props: Props) {
  const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false);
  const location = useLocation();
  const id = useId();
  const { profile } = useAppContext();

  const isShorten =
    isActiveRoute(location.pathname, 'messages') || isNotificationBarOpen;

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
      !isShorten ? 'lg:w-56' : ''
    } h-screen overflow-y-hidden fixed top-0 left-0 bottom-0 `
  } = props;

  const Links: LinkProps[] = [
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
      svgActive: iconsSvg.notificationFilled,
      isButton: true
    },
    {
      name: 'Profile',
      to: `${profile?.username.toLowerCase()}?type=posts`,
      svg: profile?.profilePicture || '',
      svgActive: profile?.profilePicture || '',
      isProfile: true
    }
  ];

  const { refs, floatingStyles } = useFloating({
    open: isNotificationBarOpen,
    onOpenChange: setIsNotificationBarOpen,
    placement: 'left',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [shift(), flip(), offset(13)]
  });

  return (
    <nav className={classNameNav}>
      <div className='flex h-full flex-col gap-6 px-3 py-5'>
        <Link to='/' className='flex justify-center py-5'>
          <img
            src={iconsSvg.cloud}
            alt='cloud'
            className={`w-6 ${!isShorten ? 'lg:hidden' : ''}`}
          />
          <p
            className={`hidden ${
              !isShorten ? 'font-cookie text-5xl text-black lg:block' : ''
            }`}
          >
            Instacloud
          </p>
        </Link>

        <div className='flex grow flex-col gap-1'>
          {Links.map(link => {
            if (link?.isButton && link?.name === 'Notifications') {
              return (
                <div key={link.name} ref={refs.setReference}>
                  <ButtonNav
                    text={link.name}
                    svg={iconsSvg.notification}
                    svgActive={iconsSvg.notificationFilled}
                    shorten={isShorten}
                    isButton
                    isOpen={isNotificationBarOpen}
                    onClick={() => {
                      setIsNotificationBarOpen(prev => !prev);
                    }}
                  />

                  {isNotificationBarOpen && (
                    <FloatingPortal id={id}>
                      <div style={floatingStyles} ref={refs.setFloating}>
                        <NotificationBar className='overflow-y-auto bg-white shadow-[5px_0px_11px_-1px_rgba(0,0,0,0.2)]' />
                      </div>
                    </FloatingPortal>
                  )}
                </div>
              );
            }

            return (
              <ButtonNav
                key={link.name}
                to={link.to}
                svg={link.svg}
                text={
                  link?.isProfile ? (profile?.username as string) : link.name
                }
                svgActive={link.svgActive}
                shorten={isShorten}
                isProfile={link?.isProfile}
              />
            );
          })}
        </div>

        <Popover
          hasArrow={true}
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
                  to={`/${profile?.username.toLowerCase()}?type=saved`}
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
            shorten={isShorten}
            svgActive={iconsSvg.moreFilled}
            isButton
          />
        </Popover>
      </div>
    </nav>
  );
}
