import { useState } from 'react';
import Dialog from '../Dialog';
import IconProfile from '../IconProfile';
import Modal from '../Modal';
// import { useDialogManager } from 'src/hooks/useDialogManager';

export default function CreatePost() {
  // const { openDialog, closeDialog, isOpen } = useDialogManager();
  const [isOpen, setIsOpen] = useState(false);
  const [includesMedia, setIncludesMedia] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setIncludesMedia(true);
  };

  return (
    <div className='mb-4 h-36 w-[34rem] max-w-full rounded-md border shadow'>
      <div className='p-4'>
        <div className='flex items-center gap-2 border-b pb-3'>
          <IconProfile />
          <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            as='button'
            className='grow rounded-full bg-gray-100 hover:bg-gray-200'
            renderDialog={
              <Modal
                closeModal={() => setIsOpen(false)}
                includesMedia={includesMedia}
                setIncludesMedia={setIncludesMedia}
              />
            }
          >
            <div className='py-2 pl-3'>
              <span className='block text-left text-base font-normal text-gray-500'>
                What&apos;s on your thought, Hưng ?
              </span>
            </div>
          </Dialog>
        </div>

        <div className='mt-2 flex justify-center'>
          <button
            className='flex items-center rounded-md px-7 py-2 font-medium text-gray-500 hover:bg-gray-100'
            onClick={handleClick}
          >
            <span>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.25 2.5H6.25C5.91848 2.5 5.60054 2.6317 5.36612 2.86612C5.1317 3.10054 5 3.41848 5 3.75V5H3.75C3.41848 5 3.10054 5.1317 2.86612 5.36612C2.6317 5.60054 2.5 5.91848 2.5 6.25V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H13.75C14.0815 17.5 14.3995 17.3683 14.6339 17.1339C14.8683 16.8995 15 16.5815 15 16.25V15H16.25C16.5815 15 16.8995 14.8683 17.1339 14.6339C17.3683 14.3995 17.5 14.0815 17.5 13.75V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM6.25 3.75H16.25V9.17031L14.9453 7.86563C14.7109 7.63138 14.3931 7.4998 14.0617 7.4998C13.7303 7.4998 13.4125 7.63138 13.1781 7.86563L7.29453 13.75H6.25V3.75ZM13.75 16.25H3.75V6.25H5V13.75C5 14.0815 5.1317 14.3995 5.36612 14.6339C5.60054 14.8683 5.91848 15 6.25 15H13.75V16.25ZM8.125 6.875C8.125 6.62777 8.19831 6.3861 8.33566 6.18054C8.47301 5.97498 8.66824 5.81476 8.89665 5.72015C9.12505 5.62554 9.37639 5.60079 9.61886 5.64902C9.86134 5.69725 10.0841 5.8163 10.2589 5.99112C10.4337 6.16593 10.5528 6.38866 10.601 6.63114C10.6492 6.87361 10.6245 7.12495 10.5298 7.35335C10.4352 7.58176 10.275 7.77699 10.0695 7.91434C9.8639 8.05169 9.62223 8.125 9.375 8.125C9.04348 8.125 8.72554 7.9933 8.49112 7.75888C8.2567 7.52446 8.125 7.20652 8.125 6.875Z'
                  fill='#6B7280'
                />
              </svg>
            </span>
            Photo/video
          </button>
        </div>
      </div>
    </div>
  );
}
