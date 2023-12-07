import { ButtonHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryString } from 'src/hooks/useQueryString';

type ButtonType = 'filter' | 'submit';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  typeButton?: ButtonType;
  isMatch?: boolean;
}
export default function Button(props: ButtonProps) {
  const { typeButton, isLoading, children, isMatch, className, ...rest } =
    props;

  if (typeButton === 'filter') {
    const classBase = `relative flex h-10 items-center justify-center px-3 py-2`;
    return (
      <button
        className={`${classBase} ${className}`}
        disabled={isLoading === true}
        {...rest}
      >
        {children}
        {isMatch && (
          <div className='border-bottom-2 absolute left-0 right-0 top-0 border-b border-gray-500'></div>
        )}
      </button>
    );
  }

  if (typeButton === 'submit') {
    const classBase =
      'px-3 py-4 border-2 rounded-lg text-sm md:text-base text-gray-700 font-medium';

    return (
      <button
        className={`${classBase} ${className}`}
        {...rest}
        disabled={isLoading === true}
      >
        {children}
      </button>
    );
  }

  return (
    <button className={className} {...rest} disabled={isLoading === true}>
      {children}
    </button>
  );
}
