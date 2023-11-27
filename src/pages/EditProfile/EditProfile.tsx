import IconProfile from 'src/components/IconProfile';
import { useRef, useState } from 'react';

export default function EditProfile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpenFile = () => {
    inputRef?.current?.click();
  };

  const [value, setValue] = useState<string>('');

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 150) {
      setValue(inputValue);
    }
  };

  return (
    <form>
      <h1 className='mb-5 text-xl font-normal'>Edit profile</h1>

      <div className='flex flex-col items-center gap-2'>
        <IconProfile
          className='flex justify-center'
          classNameImage='h-24 w-24'
        />
        <p className='font-medium'>@andreehandy</p>
        <input type='file' className='hidden' ref={inputRef} accept='image/*' />
        <button
          className='text-base font-medium text-blue-400 hover:underline'
          type='button'
          onClick={handleOpenFile}
        >
          Change photo image
        </button>
      </div>

      <div className='ml-6 mt-8 flex flex-col gap-4'>
        <div className='flex text-sm font-normal'>
          <span className='mr-4 mt-1 text-base font-medium text-black'>
            Website
          </span>
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex items-center'>
              <img
                src='/src/assets/icons/facebook.svg'
                alt=''
                className='mr-4 h-8 w-8'
              />
              <input
                type='text'
                className='h-9 w-full max-w-sm rounded border outline-none'
              />
            </div>
            <div className='flex items-center'>
              <img
                src='/src/assets/icons/twitter.svg'
                alt=''
                className='mr-4 h-8 w-8'
              />
              <input
                type='text'
                className='h-9 w-full max-w-sm  rounded border outline-none'
              />
            </div>
            <div className='flex items-center'>
              <img
                src='/src/assets/icons/youtube.svg'
                alt=''
                className='mr-4 h-8 w-8'
              />
              <input
                type='text'
                className='h-9 w-full max-w-sm  rounded border outline-none'
              />
            </div>
          </div>
        </div>

        <div className='flex text-sm font-normal'>
          <span className='mr-4 mt-1 text-base font-medium text-black'>
            Quote
          </span>

          <textarea
            className='h-16 w-full max-w-sm rounded border px-2 py-1 outline-none'
            onChange={onChangeTextarea}
            value={value}
          />
          <span className='ml-3'>{value.length}/150</span>
        </div>
      </div>
    </form>
  );
}
