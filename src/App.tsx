import CreatePost from './components/CreatePost';
import Suggested from './components/Suggested';
import PostsList from './components/PostsList';
import MainLayout from './layouts/MainLayout';
import useRouteElement from './useRouteElement';

import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const routeElement = useRouteElement();
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div className='overflow-y-hidden'>
      <MainLayout>
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
      </MainLayout>
      {showModal && <Modal toggleModal={toggleModal} />}
    </div>
  );
}

export default App;
