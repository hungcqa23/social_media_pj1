import Button from 'src/components/Button';
import FilterPost from 'src/components/FilterPost';
import Search from 'src/components/Search';
import Suggested from 'src/components/SuggestedBar';
import { iconsSvg } from 'src/constants/icons';

export default function SearchPage() {
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
                <p className='text-sm font-medium uppercase text-gray-400'>
                  Search results:{' '}
                </p>
                <Button
                  className={`'bg-gray-300' flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                  value={'posts'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' alt='' />
                  <span className='text-sm font-medium text-black'>Posts</span>
                </Button>

                <Button
                  value={'comments'}
                  className={`flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' alt='' />
                  <span className='text-sm font-medium text-black'>
                    Comments
                  </span>
                </Button>

                <Button
                  className={`flex items-center justify-center rounded-full px-3 py-2 hover:bg-gray-300`}
                  typeButton={'filter'}
                  value={'people'}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' alt='' />
                  <span className='text-sm font-medium text-black'>People</span>
                </Button>
              </div>

              <div className='flex items-center'>
                <p className='mr-3 text-sm font-normal text-gray-400'>
                  Sort by:
                </p>
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
            <FilterPost
              username='AndreeeHandless'
              date='2 months'
              description={`I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.`}
              likes={10}
              comments={5}
            />

            <FilterPost
              username='AndreeeHandless'
              date='2 months'
              description={`I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.`}
              likes={2000}
              comments={5000}
              image='/src/assets/images/user.jpg'
            />

            <FilterPost
              username='AndreeeHandless'
              date='2 months'
              description={`I'm a software engineer and a serial entrepreneur. I've started and sold
                    multiple businesses and I'm always looking for new opportunities.`}
              likes={2000}
              comments={5000}
              video='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
            />
          </div>

          <Suggested />
        </div>
      </main>
    </>
  );
}
