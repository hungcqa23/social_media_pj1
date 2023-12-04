import IconProfile from 'src/components/IconProfile';
import { Link, useParams } from 'react-router-dom';
import { iconsSvg } from 'src/constants/icons';
import Button from 'src/components/Button';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.contexts';

export default function Profile() {
  const { profile, setProfile } = useContext(AppContext);
  const { username } = useParams();
  const isProfile = username === profile?.username.toLowerCase();

  return (
    <main className='ml-auto w-[calc(100%-4.5rem)] lg:w-[calc(100%-14rem)]'>
      <div className='mx-auto max-w-4xl px-5 pt-8'>
        <header className='flex min-w-fit border-b border-gray-300 pb-10'>
          <div className='my-6 flex flex-grow justify-center'>
            <IconProfile
              className='h-40 w-40'
              classNameImage='h-40 w-40'
              isImage
              src={profile?.profilePicture}
            />
          </div>

          <section className='flex flex-grow-2 flex-col'>
            <div className='flex items-center'>
              <h2 className='mr-3 text-xl font-normal text-black'>
                {profile?.username.toLowerCase()}
              </h2>

              {isProfile && (
                <Link
                  to='/accounts/profile'
                  className='rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900'
                >
                  Edit profile
                </Link>
              )}

              {!isProfile && (
                <div className='flex gap-2'>
                  <button className='h-8 w-28 rounded-lg bg-blue-500 text-sm font-semibold text-white'>
                    Follow
                  </button>
                  <button className='rounded-full hover:bg-gray-100'>
                    <span>
                      <svg
                        width='32'
                        height='32'
                        viewBox='0 0 32 32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M18 16C18 16.3956 17.8827 16.7822 17.6629 17.1111C17.4432 17.44 17.1308 17.6964 16.7654 17.8478C16.3999 17.9991 15.9978 18.0387 15.6098 17.9616C15.2219 17.8844 14.8655 17.6939 14.5858 17.4142C14.3061 17.1345 14.1156 16.7781 14.0384 16.3902C13.9613 16.0022 14.0009 15.6001 14.1522 15.2346C14.3036 14.8692 14.56 14.5568 14.8889 14.3371C15.2178 14.1173 15.6044 14 16 14C16.5304 14 17.0391 14.2107 17.4142 14.5858C17.7893 14.9609 18 15.4696 18 16ZM7.5 14C7.10444 14 6.71776 14.1173 6.38886 14.3371C6.05996 14.5568 5.80362 14.8692 5.65224 15.2346C5.50087 15.6001 5.46126 16.0022 5.53843 16.3902C5.6156 16.7781 5.80608 17.1345 6.08579 17.4142C6.36549 17.6939 6.72186 17.8844 7.10982 17.9616C7.49778 18.0387 7.89992 17.9991 8.26537 17.8478C8.63082 17.6964 8.94318 17.44 9.16294 17.1111C9.3827 16.7822 9.5 16.3956 9.5 16C9.5 15.4696 9.28929 14.9609 8.91421 14.5858C8.53914 14.2107 8.03043 14 7.5 14ZM24.5 14C24.1044 14 23.7178 14.1173 23.3889 14.3371C23.06 14.5568 22.8036 14.8692 22.6522 15.2346C22.5009 15.6001 22.4613 16.0022 22.5384 16.3902C22.6156 16.7781 22.8061 17.1345 23.0858 17.4142C23.3655 17.6939 23.7219 17.8844 24.1098 17.9616C24.4978 18.0387 24.8999 17.9991 25.2654 17.8478C25.6308 17.6964 25.9432 17.44 26.1629 17.1111C26.3827 16.7822 26.5 16.3956 26.5 16C26.5 15.4696 26.2893 14.9609 25.9142 14.5858C25.5391 14.2107 25.0304 14 24.5 14Z'
                          fill='black'
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className='mt-4 flex gap-4'>
              <p className='font-normal'>
                <span className='font-semibold text-black'>
                  {profile?.postsCount || 0}
                </span>{' '}
                posts
              </p>
              <button className='font-normal'>
                <span className='font-semibold text-black'>
                  {profile?.followersCount || 0}
                </span>{' '}
                followers
              </button>
              <button className='font-normal'>
                <span className='font-semibold text-black'>
                  {profile?.followingCount || 0}
                </span>{' '}
                following
              </button>
            </div>

            <p className='mt-5 text-sm font-medium text-black'>An Hưng</p>
            <p className='mt-4 max-w-[22rem] whitespace-pre-wrap text-sm text-black'>
              𝑺𝒉𝒂𝒍𝒍 𝑰 𝒄𝒐𝒎𝒑𝒂𝒓𝒆 𝒚𝒐𝒖 𝒕𝒐 𝒂 𝒔𝒖𝒎𝒎𝒆𝒓’𝒔 𝒅𝒂𝒚. 𝑻𝒉𝒐𝒖 𝒂𝒓𝒕 𝒎𝒐𝒓𝒆 𝒍𝒐𝒗𝒆𝒍𝒚 𝒂𝒏𝒅
              𝒎𝒐𝒓𝒆 𝒕𝒆𝒎𝒑𝒆𝒓𝒂𝒕𝒆.
            </p>
          </section>
        </header>

        <section className='mt-2'>
          <div className='flex gap-2 text-sm'>
            {/* Filter buttons */}
            <Button typeButton='filter' value={'posts'}>
              <img src={`${iconsSvg.posts}`} className='mr-2' alt='Post icon' />
              <span className='font-medium text-black'>Posts</span>
            </Button>
            <Button typeButton='filter' value={'images'}>
              <img
                src={`${iconsSvg.images}`}
                className='mr-2'
                alt='Images icon'
              />
              <span className='font-medium text-black'>Images</span>
            </Button>
            <Button typeButton='filter' value={'videos'}>
              <img
                src={`${iconsSvg.videos}`}
                className='mr-2'
                alt='Videos icon'
              />
              <span className='font-medium text-black'>Videos</span>
            </Button>
            <Button typeButton='filter' value={'saved'}>
              <img
                src={iconsSvg.savedFilled}
                className='mr-2'
                alt='Saved icon'
              />
              <span className='font-medium text-black'>Saved</span>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
