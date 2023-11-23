import { NavLink, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { isActiveRoute } from 'src/utils/utils';
import {
  FloatingPortal,
  autoUpdate,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
  arrow,
  FloatingArrow,
  useHover
} from '@floating-ui/react';
import { iconsSvg } from 'src/constants/icons';

interface Props {
  svg: string;
  svgActive: string;
  text: string;
  to: string;
  shorten?: boolean;
  isProfile?: boolean;
  className?: string;
  isButton?: boolean;
  classNameButton?: string;
  classNameText?: string;
}

export default function ButtonNav(props: Props) {
  let lgNavLink = 'lg:h-12 lg:justify-normal lg:border-none lg:w-48';
  let lgImg = 'lg:ml-2 lg:w-6';
  let lgP = 'lg:block lg:font-medium lg:ml-2';

  const {
    svg,
    text,
    to,
    svgActive,
    shorten,
    isProfile,
    classNameText,
    className = ({ isActive }: { isActive: boolean }) =>
      `${isActive ? 'border border-gray-300 font-medium' : ''} flex h-12 w-12 items-center 
    justify-center gap rounded-lg 
    transition-all hover:bg-gray-200 ${lgNavLink} active:bg-gray-100`,
    classNameButton = `flex h-12 w-12 items-center 
    justify-center gap rounded-lg 
    transition-all hover:bg-gray-200 ${lgNavLink} active:bg-gray-100`,
    isButton
  } = props;
  const [isHover, setIsHover] = useState(false);

  const pathname = useLocation().pathname;

  const isActive =
    isActiveRoute(pathname, text.toLowerCase()) || (text === 'Home' && pathname === '/');

  if (shorten) {
    lgNavLink = '';
    lgImg = '';
    lgP = '';
  }

  // Test Floating UI
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: isOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange: setIsOpen,
    middleware: [shift(), offset(5), arrow({ element: arrowRef })]
  });
  const click = useClick(context);
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover]);

  return (
    <>
      {isButton ? (
        <>
          <button
            className={classNameButton}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <div
              className={`${isHover && 'scale-105'} ${
                isActive && 'scale-105'
              } ${lgImg} flex h-6 w-6 items-center justify-center transition-all duration-150`}
            >
              <img
                src={`${isActive ? svgActive : svg}`}
                className={`h-6 w-6 ${isProfile ? 'rounded-full' : ''} object-cover transition-all`}
                alt={`${text} logo`}
              />
            </div>
            <p className={`hidden ${lgP}`}>{text}</p>

            {/* test floating modal */}
            <FloatingPortal>
              {isOpen && (
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  className='rounded-lg bg-white p-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]'
                  {...getFloatingProps()}
                >
                  <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    width={10}
                    fill='white'
                    staticOffset={'10%'}
                  />
                  <ButtonNav svg={iconsSvg.saved} svgActive='' text='Saved' to='/' />
                  <div className='w-full border-t'>
                    <ButtonNav svg={iconsSvg.more} svgActive='' text='Log out' to='/' isButton />
                  </div>
                </div>
              )}
            </FloatingPortal>
          </button>
        </>
      ) : (
        <NavLink
          to={to}
          className={className}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={`${isHover && 'scale-105'} ${
              isActive && 'scale-105'
            } ${lgImg} } flex h-6 w-6 items-center justify-center transition-all
            duration-150`}
          >
            <img
              src={`${isActive ? svgActive : svg}`}
              className={`h-6 w-6 rounded-full object-cover transition-all ${
                isProfile && isActive && 'border-2 border-black'
              }`}
              alt={`${text} logo`}
            />
          </div>
          <p className={`hidden ${lgP} ${classNameText}`}>{text}</p>
        </NavLink>
      )}
    </>
  );
}
