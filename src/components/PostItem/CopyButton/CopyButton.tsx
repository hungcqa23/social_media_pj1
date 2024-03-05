import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface Props {
  className?: string;
  content: string;
  children?: React.ReactNode;
}
export default function CopyButton({ className, content }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    copy(content);
    setIsCopied(true);

    // Reset the "copied" state after delay 1s
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleCopyClick}
      className={`${className} relative transition-[background] duration-200 ease-normal`}
    >
      <svg
        className={classNames('duration-400 absolute transition-opacity', {
          'opacity-0': isCopied,
          'opacity-100': !isCopied
        })}
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_62_127)'>
          <path
            d='M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z'
            className='fill-gray-400'
          />
        </g>
        <defs>
          <clipPath id='clip0_62_127'>
            <rect width={24} height={24} fill='white' />
          </clipPath>
        </defs>
      </svg>

      <svg
        className={classNames('text-gray-400 transition-opacity duration-200', {
          'opacity-0': !isCopied
        })}
        fill='none'
        height={24}
        shapeRendering='geometricPrecision'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        viewBox='0 0 24 24'
        width={24}
        aria-hidden='true'
        style={{ width: 20, height: 20 }}
      >
        <path d='M20 6L9 17l-5-5' />
      </svg>
    </button>
  );
}
