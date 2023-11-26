import { useState } from 'react';
import Dialog from '../Dialog';
import IconProfile from '../IconProfile';
import Modal from '../Modal';

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-4 h-40 w-[34rem] max-w-full rounded-md border shadow'>
      <div className='p-4'>
        <div className='flex gap-2 border-b pb-3'>
          <IconProfile />
          <Dialog
            as='button'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className='grow rounded-full bg-gray-100 hover:bg-gray-200'
            renderDialog={<Modal closeModal={() => setIsOpen(false)} />}
          >
            <div className='py-2 pl-3'>
              <span className='block text-left text-base font-normal text-gray-500'>
                What&apos;s on your thought, Hưng ?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
