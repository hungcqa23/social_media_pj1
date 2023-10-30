import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export default function Button(props: ButtonProps) {
  const {
    isLoading,
    children,
    className = 'px-3 py-4 border-2 rounded-lg text-sm md:text-base text-gray-700 font-medium',
    ...rest
  } = props;

  return (
    <button className={className} {...rest} disabled={isLoading === true}>
      {children}
    </button>
  );
}
