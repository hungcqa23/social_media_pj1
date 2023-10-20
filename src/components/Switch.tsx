import { InputHTMLAttributes, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  handleCheckboxChange: () => void;
}
export default function Switch(props: Props) {
  const { checked, handleCheckboxChange, id, ...rest } = props;
  return (
    <div className='flex items-center'>
      <input
        checked={checked}
        onChange={handleCheckboxChange}
        type='checkbox'
        id={id}
        className='relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full border-2  border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-5 before:w-5 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow
        before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-blue-600 dark:checked:before:bg-blue-200 dark:focus:ring-offset-gray-800'
      />
    </div>
  );
}
