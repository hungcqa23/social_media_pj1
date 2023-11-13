import { useState } from 'react';
import CreatePost from 'src/components/CreatePost';
import Modal from 'src/components/Modal';
import PostsList from 'src/components/PostsList';
import Suggested from 'src/components/Suggested';

export default function Main() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <main className='ml-auto w-[calc(100%-4.5rem)] lg:w-[calc(100%-14rem)]'>
        <div className='flex w-full justify-center pt-5'>
          <div className='w-full max-w-[40rem]'>
            <div className='mt-9 flex flex-col items-center'>
              <CreatePost toggleModal={toggleModal} />
              <PostsList />
            </div>
          </div>

          <Suggested />
        </div>
      </main>
      {showModal && <Modal toggleModal={toggleModal} />}
    </>
  );
}
