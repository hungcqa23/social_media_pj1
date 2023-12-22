import { Link, useLocation, useNavigate } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import ButtonNav from '../ButtonNav/ButtonNav';
import { isActiveRoute } from 'src/utils/utils';
import Popover from '../Popover';
import { useMutation, useQuery } from '@tanstack/react-query';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import { clearLS } from 'src/utils/auth';
import NotificationBar from '../NotificationBar';

import { useEffect, useId, useState } from 'react';
import {
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react';
import { notificationApi } from 'src/apis/notification.api';

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
  const { profile, setIsAuthenticated, setProfile } = useAppContext();

  const isShorten =
    isActiveRoute(location.pathname, 'messages') || isNotificationBarOpen;

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setProfile(null);
      setIsAuthenticated(false);
    },
    onError: () => {
      setIsAuthenticated(false);
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
      to: '/search',
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
      to: `${profile?._id}`,
      svg: profile?.profilePicture || '',
      svgActive: profile?.profilePicture || '',
      isProfile: true
    }
  ];

  const { refs, floatingStyles, context } = useFloating({
    open: isNotificationBarOpen,
    onOpenChange: setIsNotificationBarOpen,
    placement: 'left',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [shift(), flip(), offset(13)]
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.getAllNotifications()
  });
  const hasNotifications =
    data?.data.notification.some(notification => !notification.read) || false;

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
                <div
                  key={link.name}
                  ref={refs.setReference}
                  {...getReferenceProps()}
                >
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
                    hasNotification={hasNotifications}
                  />

                  {isNotificationBarOpen && (
                    <FloatingPortal id={id}>
                      <div
                        style={floatingStyles}
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                      >
                        <NotificationBar className='min-h-[20rem] overflow-y-auto bg-white shadow-[5px_0px_11px_-1px_rgba(0,0,0,0.2)] md:min-w-[24rem]' />
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
          placement='top-start'
          renderPopover={
            <div className='rounded-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)]'>
              <div className='p-2'>
                <ButtonNav
                  text='Setting'
                  svg={iconsSvg.setting}
                  to='/accounts/profile'
                />

                <ButtonNav
                  to={`/${profile?._id}/saved`}
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
