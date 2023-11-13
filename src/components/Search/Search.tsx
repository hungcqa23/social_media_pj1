import { Dispatch, SetStateAction, useState } from 'react';
interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}
export default function Search() {
  const [query, setQuery] = useState<string>('');

  return (
    <div className='flex w-full justify-between rounded-full border bg-gray-200 px-4 py-2 text-base font-normal outline-none transition duration-500'>
      <div className='flex w-full basis-11/12 items-center gap-3'>
        {query === '' && (
          <span className='flex h-6 basis-6  items-center justify-center'>
            <img src='/src/assets/icons/search-bar.svg' alt='Search logo' />
          </span>
        )}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search Instacloud'
          className='grow bg-gray-200 text-gray-500 outline-none focus:text-gray-500 focus:outline-none'
          maxLength={100}
        />
      </div>

      {query !== '' && (
        <span
          className='hover:pointer flex h-6 basis-6 cursor-pointer items-center justify-center rounded-full bg-gray-300 '
          onClick={() => setQuery('')}
        >
          <img src='/src/assets/icons/close.svg' alt='Close' />
        </span>
      )}
    </div>
  );
}
