import useRouteElement from './useRouteElement';

import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const routeElement = useRouteElement();

  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      {/* <MainLayout>
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
      {showModal && <Modal toggleModal={toggleModal} />} */}
      {routeElement}
    </div>
  );
}

export default App;
