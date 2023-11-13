import { set } from 'lodash';
import { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import Button from 'src/components/Button';
import IconProfile from 'src/components/IconProfile';
import Modal from 'src/components/Modal';
import Search from 'src/components/Search';
import Suggested from 'src/components/Suggested';
import { iconsSvg } from 'src/constants/icons';
import { useQueryString } from 'src/utils/utils';

export default function SearchPage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const isImage = false;

  return (
    <>
      <main className='ml-auto w-[calc(100%-4.5rem)] lg:w-[calc(100%-14rem)]'>
        <div className='flex w-full justify-center'>
          <div className='w-full max-w-[40rem]'>
            <div className='mb-7 mt-10'>
              <Search />
            </div>

            {/* Images */}
            <div>
              <div className='mb-4 flex items-center gap-6'>
                <p className='text-sm font-medium uppercase text-gray-400'>Search results: </p>
                <Button
                  className={`'bg-gray-300' flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                  value={'posts'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' />
                  <span className='text-sm font-medium text-black'>Posts</span>
                </Button>

                <Button
                  value={'comments'}
                  className={`flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' />
                  <span className='text-sm font-medium text-black'>Comments</span>
                </Button>

                <Button
                  className={`flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                  value={'people'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' />
                  <span className='text-sm font-medium text-black'>People</span>
                </Button>
              </div>

              <div className='flex items-center'>
                <p className='mr-3 text-sm font-normal text-gray-400'>Sort by: </p>
                <div className='relative max-w-sm'>
                  <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                    <svg
                      className='h-4 w-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                    </svg>
                  </div>
                  <input
                    type='date'
                    className='block w-fit rounded-lg border p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                    defaultValue='2021-08-01'
                  />
                </div>
              </div>
            </div>

            {/* Filter Post */}
            <div className='mt-10 px-4 pb-4'>
              <div className='flex w-full border-b pb-4'>
                <div className='flex-grow basis-80'>
                  <div className='flex items-center gap-4'>
                    <IconProfile />
                    <span className='text-sm font-medium text-black'>AndreeeHandless</span>
                    <span className='text-xs font-normal text-gray-300'>2 months ago</span>
                    <button className='text-xs font-semibold text-blue-500'>Follow</button>
                  </div>

                  <p className='mt-2 text-sm'>
                    I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.
                  </p>

                  <div className='mt-4 flex gap-4'>
                    <p className='text-sm text-gray-500'>2k likes</p>
                    <p className='text-sm text-gray-500'>510 comments</p>
                  </div>
                </div>

                {/* Images */}
                {false && (
                  <div className='flex flex-grow justify-end'>
                    <img
                      src='/src/assets/images/user.jpg'
                      alt=''
                      className='h-32 w-56 rounded-md object-cover'
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='mt-5 px-4 pb-4'>
              <div className='flex w-full border-b pb-4'>
                <div className='basis-80'>
                  <div className='flex items-center justify-between gap-3'>
                    <IconProfile />
                    <span className='text-sm font-medium text-black'>AndreeeHandless</span>
                    <span className='text-xs font-normal text-gray-300'>2 months ago</span>
                    <button className='text-xs font-semibold text-blue-500'>Follow</button>
                  </div>

                  <p className='mt-2 text-sm'>
                    I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.
                  </p>
                </div>

                <div className='flex flex-grow justify-end'>
                  <img
                    src='/src/assets/images/user.jpg'
                    alt=''
                    className='h-32 w-56 rounded-md object-cover'
                  />
                </div>
              </div>
            </div>

            <div className='mt-5 px-4 pb-4'>
              <div className='flex w-full border-b pb-4'>
                <div className='basis-80'>
                  <div className='flex items-center justify-between gap-3'>
                    <IconProfile />
                    <span className='text-sm font-medium text-black'>AndreeeHandless</span>
                    <span className='text-xs font-normal text-gray-300'>2 months ago</span>
                    <button className='text-xs font-semibold text-blue-500'>Follow</button>
                  </div>

                  <p className='mt-2 text-sm'>
                    I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.
                  </p>
                </div>

                <div className='flex flex-grow justify-end'>
                  <img
                    src='/src/assets/images/user.jpg'
                    alt=''
                    className='h-32 w-56 rounded-md object-cover'
                  />
                </div>
              </div>
            </div>

            <div className='mt-5 px-4 pb-4'>
              <div className='flex w-full border-b pb-4'>
                <div className='basis-80'>
                  <div className='flex items-center justify-between gap-3'>
                    <IconProfile />
                    <span className='text-sm font-medium text-black'>AndreeeHandless</span>
                    <span className='text-xs font-normal text-gray-300'>2 months ago</span>
                    <button className='text-xs font-semibold text-blue-500'>Follow</button>
                  </div>

                  <p className='mt-2 text-sm'>
                    I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.
                  </p>
                </div>

                <div className='flex flex-grow justify-end'>
                  <img
                    src='/src/assets/images/user.jpg'
                    alt=''
                    className='h-32 w-56 rounded-md object-cover'
                  />
                </div>
              </div>
            </div>
          </div>

          <Suggested />
        </div>
      </main>
      {showModal && <Modal toggleModal={toggleModal} />}
    </>
  );
}
