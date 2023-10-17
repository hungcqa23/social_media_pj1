import { useState } from 'react';

export default function Switch() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='flex items-center'>
      <input
        checked={isChecked}
        onChange={handleCheckboxChange}
        type='checkbox'
        id='hs-basic-with-description'
        className='relative h-7 w-[3.25rem] shrink-0 cursor-pointer appearance-none rounded-full border-2  border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow
        before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-blue-600 dark:checked:before:bg-blue-200 dark:focus:ring-offset-gray-800'
      />
    </div>
  );
}
