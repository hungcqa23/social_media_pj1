import { ButtonHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryString } from 'src/utils/utils';

type ButtonType = 'filter';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  typeButton?: ButtonType;
}
export default function Button(props: ButtonProps) {
  const {
    typeButton,
    isLoading,
    children,
    className = 'px-3 py-4 border-2 rounded-lg text-sm md:text-base text-gray-700 font-medium',
    ...rest
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  if (typeButton === 'filter') {
    const isMatch = useQueryString()?.type === rest.value;
    const handleClick = (type: string) => {
      searchParams.set('type', type);
      setSearchParams(searchParams);
    };

    return (
      <button
        className={`${
          isMatch ? 'bg-gray-300' : ''
        } flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
        disabled={isLoading === true}
        onClick={() => handleClick(rest.value as string)}
        {...rest}
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
