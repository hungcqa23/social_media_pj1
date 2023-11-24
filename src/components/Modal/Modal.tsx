import { useRef, useState } from 'react';
import Profile from '../IconProfile';
import ReactDOM from 'react-dom';

interface Props {
  toggleModal: () => void;
}
export default function Modal({ toggleModal }: Props) {
  // return ReactDOM.createPortal(
  //   <div>Hello World!</div>,
  //   document.querySelector('.modal') as HTMLElement
  // );

  const [value, setValue] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set the height to the scrollHeight
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    handleTextAreaChange();
  };

  return (
    <div className='fixed inset-0 h-screen w-screen'>
      <div className='relative h-full w-full'>
        {/* <div className='absolute inset-0 bg-slate-100 opacity-80' onClick={toggleModal}></div> */}
        <form className='absolute left-1/2 top-1/2 mx-auto h-[30rem] w-[33rem] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow'>
          <div className='relative flex h-14 items-center justify-center border-b p-5'>
            <div className='text-xl font-bold text-black'>Create post</div>
            <button
              className='top-[calc((100% - 2.25rem) / 2)] absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200'
              onClick={toggleModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
                className='h-6 fill-gray-500'
              >
                <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
              </svg>
            </button>
          </div>

          <div className='flex h-[calc(100%-3.5rem)] flex-col justify-between'>
            <div>
              <div className='mx-4 flex py-3'>
                <Profile to='/profile' className='mr-2 h-11 w-11' />
                <div>
                  <div>
                    <span className='font-semibold'>An Hưng</span>
                  </div>
                  <button>
                    <span className='text-sm font-medium'>Only Me</span>
                  </button>
                </div>
              </div>

              <div>
                <div className='w-full px-4'>
                  <textarea
                    ref={textareaRef}
                    onChange={onChange}
                    className='max-h-56 w-full resize-none overflow-auto whitespace-pre-wrap text-base font-medium focus:outline-none'
                    placeholder={"What's on your mind, An Hưng ?"}
                    value={value}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className='px-4 py-4'>
              <button
                disabled={value === ''}
                className='block h-11 w-full rounded-md bg-blue-600 text-center text-sm font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300'
              >
                <span className='text-base font-semibold text-white'>Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
