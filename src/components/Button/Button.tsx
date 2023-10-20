import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  const defaultClassName = 'p-4 border-2 rounded-lg text-base text-gray-700 font-medium';
  const classNameBtn = className ? `${defaultClassName} ${className}` : `${defaultClassName}`;

  return (
    <button className={classNameBtn} {...rest}>
      {children}
    </button>
  );
}
