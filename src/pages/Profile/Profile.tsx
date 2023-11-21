import IconProfile from 'src/components/IconProfile';
import { Link } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import Button from 'src/components/Button';

export default function Profile() {
  return (
    <main className='ml-auto w-[calc(100%-4.5rem)] lg:w-[calc(100%-14rem)]'>
      <div className='mx-auto max-w-4xl px-5 pt-8'>
        <header className='flex min-w-fit border-b border-gray-300 pb-10'>
          <div className='my-6 flex flex-grow justify-center'>
            <IconProfile
              className='h-[9rem] w-[9rem]'
              classNameImage='h-[9rem] w-[9rem] rounded-full'
            />
          </div>

          <section className='flex flex-grow-2 flex-col'>
            <div className='flex items-center'>
              <h2 className='mr-3 font-medium text-black'>@anhungwindyy</h2>
              <Link
                to='/accounts/profile'
                className='rounded-lg bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-900'
              >
                Edit profile
              </Link>
            </div>

            <div className='mt-4 flex gap-4'>
              <p className='font-normal'>
                <span className='font-semibold text-black'>2</span> posts
              </p>
              <p className='font-normal'>
                <span className='font-semibold text-black'>50</span> followers
              </p>
              <p className='font-normal'>
                <span className='font-semibold text-black'>74</span> following
              </p>
            </div>

            <p className='mt-5 text-sm font-medium text-black'>An Hưng</p>

            <p className='mt-4 max-w-[20rem] whitespace-pre-wrap'>
              𝑺𝒉𝒂𝒍𝒍 𝑰 𝒄𝒐𝒎𝒑𝒂𝒓𝒆 𝒚𝒐𝒖 𝒕𝒐 𝒂 𝒔𝒖𝒎𝒎𝒆𝒓’𝒔 𝒅𝒂𝒚 𝑻𝒉𝒐𝒖 𝒂𝒓𝒕 𝒎𝒐𝒓𝒆 𝒍𝒐𝒗𝒆𝒍𝒚 𝒂𝒏𝒅 𝒎𝒐𝒓𝒆 𝒕𝒆𝒎𝒑𝒆𝒓𝒂𝒕𝒆.
            </p>
          </section>
        </header>

        <section className='mt-2'>
          <div className='flex gap-2 text-sm'>
            <Button typeButton='filter' value={'posts'}>
              <img src={`${iconsSvg.posts}`} className='mr-2' />
              <span className='font-medium text-black'>Posts</span>
            </Button>
            <Button typeButton='filter' value={'images'}>
              <img src={`${iconsSvg.images}`} className='mr-2' />
              <span className='font-medium text-black'>Images</span>
            </Button>
            <Button typeButton='filter' value={'videos'}>
              <img src={`${iconsSvg.videos}`} className='mr-2' />
              <span className='font-medium text-black'>Videos</span>
            </Button>
            <Button typeButton='filter' value={'saved'}>
              <img src={iconsSvg.savedFilled} className='mr-2' />
              <span className='font-medium text-black'>Saved</span>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
