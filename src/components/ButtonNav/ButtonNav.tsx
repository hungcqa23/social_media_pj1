import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface Props {
  svg: string;
  svgActive: string;
  text: string;
  to: string;
  shorten?: boolean;
  isProfile?: boolean;
  className?: string;
}

export default function ButtonNav(props: Props) {
  const {
    svg,
    text,
    to,
    svgActive,
    shorten,
    isProfile,
    className = ({ isActive }: { isActive: boolean }) =>
      `${isActive ? 'border border-gray-300 font-medium' : ''} flex h-12 w-12 items-center 
    justify-center gap-2 rounded-lg 
    transition-all hover:bg-gray-200 ${lgNavLink} active:bg-gray-100`
  } = props;
  const [isHover, setIsHover] = useState(false);

  const isActive = useLocation().pathname === to;

  let lgNavLink = 'lg:h-12 lg:justify-normal lg:border-none lg:w-48';
  let lgImg = 'lg:ml-2 lg:w-5';
  let lgP = 'lg:block';

  if (shorten) {
    lgNavLink = '';
    lgImg = '';
    lgP = '';
  }

  return (
    <NavLink
      to={to}
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`${isHover && 'scale-105'} ${
          isActive && 'scale-105'
        } ${lgImg} flex h-6 w-6 items-center justify-center transition-all duration-150`}
      >
        <img
          src={`${isActive ? svgActive : svg}`}
          className='rounded-full transition-all'
          alt='home'
        />
      </div>
      <p className={`hidden ${lgP}`}>{text}</p>
    </NavLink>
  );
}
