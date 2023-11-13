import { NavLink, ParamParseKey, Path, useMatch } from 'react-router-dom';
import { useState } from 'react';

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

  type ParamKeys = 'type' | 'id';
  const match = useMatch<ParamKeys, string>('/:type');
  const isActive =
    match?.params.type === text.toLowerCase() ||
    (match?.params.type === undefined && text === 'house');

  if (shorten) {
    lgNavLink = '';
    lgImg = '';
    lgP = '';
  }

  return (
    <>
      {isButton ? (
        <NavLink
          to={to}
          className={classNameButton}
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
              className={`h-6 w-6 ${isProfile ? 'rounded-full' : ''} object-cover transition-all`}
              alt={`${text} logo`}
            />
          </div>
          <p className={`hidden ${lgP}`}>{text}</p>
        </NavLink>
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
          <p className={`hidden ${lgP}`}>{text}</p>
        </NavLink>
      )}
    </>
  );
}
