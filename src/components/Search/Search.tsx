import { useEffect, useState } from 'react';
export default function Search({
  query,
  onChange
}: {
  query?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [filter, setFilter] = useState<string>('');
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFilter('');
        onChange('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChange]);
  return (
    <div className='flex w-full justify-between rounded-full border bg-gray-100 px-4 py-2 text-base font-normal outline-none transition duration-500'>
      <div className='flex w-full basis-11/12 items-center gap-3'>
        {query === '' && (
          <span className='flex h-6 basis-6 items-center justify-center'>
            <img src='/src/assets/icons/search-bar.svg' alt='Search logo' />
          </span>
        )}
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onChange(filter);
            }
          }}
          placeholder='Search Instacloud...'
          className='focus:text-black-500 grow bg-gray-100 text-black outline-none focus:outline-none'
          maxLength={100}
        />
      </div>

      {query !== '' && (
        <button
          className='hover:pointer flex h-6 shrink-0 basis-6 cursor-pointer items-center justify-center rounded-full bg-gray-500'
          onClick={() => {
            setFilter('');
            onChange('');
          }}
        >
          <span>
            <svg
              className='h-3 w-3'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.4531 7.5L14.3594 11.4453C14.8672 11.9141 14.8672 12.6953 14.3594 13.1641L13.5 14.0234C13.0312 14.5312 12.25 14.5312 11.7812 14.0234L7.875 10.1172L3.92969 14.0234C3.46094 14.5312 2.67969 14.5312 2.21094 14.0234L1.35156 13.1641C0.84375 12.6953 0.84375 11.9141 1.35156 11.4453L5.25781 7.5L1.35156 3.59375C0.84375 3.125 0.84375 2.34375 1.35156 1.875L2.21094 1.01562C2.67969 0.507812 3.46094 0.507812 3.92969 1.01562L7.875 4.92188L11.7812 1.01562C12.25 0.507812 13.0312 0.507812 13.5 1.01562L14.3594 1.875C14.8672 2.34375 14.8672 3.125 14.3594 3.59375L10.4531 7.5Z'
                className='fill-white'
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
