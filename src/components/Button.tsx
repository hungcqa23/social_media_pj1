import { HTMLInputTypeAttribute } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}
export default function Button(props: Props) {
  const { children, className, type } = props;
  const defaultClassName = 'p-4 border-2 rounded-lg text-base text-gray-700 font-medium';
  const classNameBtn = className ? `${className} ${defaultClassName}` : `${defaultClassName}`;
  return (
    <button className={classNameBtn} type={type ? type : undefined}>
      {children}
    </button>
  );
}
