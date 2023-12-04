import { ButtonHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryString } from 'src/hooks/useQueryString';

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
  const queryStr = useQueryString()?.type;

  if (typeButton === 'filter') {
    const isMatch = queryStr === rest.value;
    const handleClick = (type: string) => {
      searchParams.set('type', type);
      setSearchParams(searchParams);
    };

    return (
      <button
        className={`
        relative flex h-10 items-center justify-center px-3 py-2 hover:bg-slate-100`}
        disabled={isLoading === true}
        onClick={() => handleClick(rest.value as string)}
        {...rest}
      >
        {children}
        {isMatch && (
          <div className='border-bottom-2 absolute bottom-0 left-0 right-0 border-b-2 border-gray-500'></div>
        )}
      </button>
    );
  }

  return (
    <button className={className} {...rest} disabled={isLoading === true}>
      {children}
    </button>
  );
}
