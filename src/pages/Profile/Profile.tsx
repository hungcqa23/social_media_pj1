import IconProfile from 'src/components/IconProfile';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'src/components/Button';
import { useContext, useState } from 'react';
import { AppContext } from 'src/contexts/app.contexts';
import classNames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from 'src/apis/profile.api';
import ImageItem from './ImageItem';
import { Post } from 'src/types/post.type';
import PostItem from 'src/components/PostItem';
import List from 'src/components/List';
import Spinner from 'src/components/Spinner';
import NotFound from '../NotFound';
import { User } from 'src/types/user.type';
import { formatSocialNumber } from 'src/utils/helper';
import Dialog from 'src/components/Dialog';
import Modal from 'src/components/Modal';

const classNamePath = ({ isMatch }: { isMatch: boolean }) =>
  classNames(``, { 'fill-gray-500': !isMatch, 'fill-black': isMatch });

export default function Profile() {
  const [openModalFollow, setOpenModalFollow] = useState({
    following: false,
    follower: false
  });
  const [openOptions, setOpenOptions] = useState({
    menu: false,
    options: false,
    block: false
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const buttonsFilter = [
    {
      value: '',
      isMatch: false,
      svg: ({ isMatch }: { isMatch: boolean }) => (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 2H22V22H2V2ZM4 4V8H8V4H4ZM10 4V8H14V4H10ZM16 4V8H20V4H16ZM20 10H16V14H20V10ZM20 16H16V20H20V16ZM14 20V16H10V20H14ZM8 20V16H4V20H8ZM4 14H8V10H4V14ZM10 10V14H14V10H10Z'
            fill='black'
            className={classNamePath({ isMatch })}
          />
        </svg>
      )
    },
    {
      value: 'images',
      isMatch: false,
      svg: ({ isMatch }: { isMatch: boolean }) => (
        <svg
          className='h-6 w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 2H22V22H2V2ZM4 20H17.586L9 11.414L4 16.414V20ZM20 19.586V4H4V13.586L9 8.586L20 19.586ZM15.547 7C15.2818 7 15.0274 7.10536 14.8399 7.29289C14.6524 7.48043 14.547 7.73478 14.547 8C14.547 8.26522 14.6524 8.51957 14.8399 8.70711C15.0274 8.89464 15.2818 9 15.547 9C15.8122 9 16.0666 8.89464 16.2541 8.70711C16.4416 8.51957 16.547 8.26522 16.547 8C16.547 7.73478 16.4416 7.48043 16.2541 7.29289C16.0666 7.10536 15.8122 7 15.547 7ZM12.547 8C12.547 7.20435 12.8631 6.44129 13.4257 5.87868C13.9883 5.31607 14.7514 5 15.547 5C16.3426 5 17.1057 5.31607 17.6683 5.87868C18.2309 6.44129 18.547 7.20435 18.547 8C18.547 8.79565 18.2309 9.55871 17.6683 10.1213C17.1057 10.6839 16.3426 11 15.547 11C14.7514 11 13.9883 10.6839 13.4257 10.1213C12.8631 9.55871 12.547 8.79565 12.547 8Z'
            fill='black'
            className={classNamePath({ isMatch })}
          />
        </svg>
      )
    },
    {
      value: 'videos',
      isMatch: false,
      svg: ({ isMatch }: { isMatch: boolean }) => (
        <svg
          className='h-6 w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 2H22V22H2V2ZM4 4V20H20V4H4ZM8 6.37L17.75 12L8 17.63V6.37ZM10 9.835V14.165L13.75 12L10 9.835Z'
            className={classNamePath({ isMatch })}
          />
        </svg>
      )
    },
    {
      value: 'saved',
      isMatch: false,
      svg: ({ isMatch }: { isMatch: boolean }) => (
        <svg
          className='h-6 w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z'
            className={classNamePath({ isMatch })}
          />
        </svg>
      )
    }
  ];
  const { profile } = useContext(AppContext);
  const { userId, type } = useParams<{
    userId: string;
    type?: string;
  }>();

  // Profile data
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError
  } = useQuery({
    queryKey: ['profile-materials', userId],
    queryFn: () => profileApi.getProfileMaterial(userId || ''),
    retry: false
  });
  const userProfile = profileData?.data.user as User;
  const posts = profileData?.data.posts || [];
  const savedPosts = profileData?.data.savedPosts || [];
  const imagePosts = profileData?.data.image || [];
  const isProfile = userId === profile?._id.toLowerCase();
  if (!isProfile) {
    // Modify the original array directly
    const savedButtonIndex = buttonsFilter.findIndex(
      button => button.value === 'saved'
    );
    if (savedButtonIndex !== -1) buttonsFilter.pop();
  }

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: () => profileApi.follow(userId || '')
  });
  const followers = profileData?.data.followers;
  const following = profileData?.data.following;
  const isFollowing =
    followers?.map(follower => follower._id).includes(profile?._id || '') ||
    false;
  const unfollowMutation = useMutation({
    mutationFn: () =>
      profileApi.unfollow({
        followingId: userId || '',
        userId: profile?._id || ''
      })
  });

  const handleFollow = async () => {
    try {
      if (isFollowing) await unfollowMutation.mutateAsync();
      if (!isFollowing) await followMutation.mutateAsync();
      queryClient.invalidateQueries({
        queryKey: ['profile-materials', userId]
      });
    } catch (error) {
      console.log(error);
    }
  };

  buttonsFilter.forEach(button => {
    if (button.value === type || (button.value === '' && type === undefined)) {
      button.isMatch = true;
    } else button.isMatch = false;
  });

  const blockMutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      profileApi.blockAccount(userId || '')
  });

  return (
    <main className='ml-auto max-h-screen w-[calc(100%-4.5rem)] overflow-y-auto lg:w-[calc(100%-14rem)]'>
      <div className='mx-auto max-w-4xl px-5 pt-8'>
        {/* Header */}
        {isLoadingProfile && (
          <div className='flex h-96 items-center justify-center'>
            <Spinner />
          </div>
        )}

        {/* Error */}
        {isError && <NotFound />}

        {blockMutation.isPending && <Spinner />}

        {!isLoadingProfile && !isError && !blockMutation.isPending && (
          <>
            <header className='flex min-w-fit flex-col pb-10 md:flex-row'>
              <div className='my-6 flex flex-grow justify-center'>
                <IconProfile
                  className='h-32 w-32 md:h-40 md:w-40'
                  classNameImage='md:h-40 md:w-40 w-32 h-32'
                  isImage
                  src={profile?.profilePicture}
                />
              </div>

              {/* Follower information */}
              <section className='flex flex-grow-2 flex-col items-center md:items-start'>
                {/* Interaction */}
                <div className='flex items-center'>
                  <h2 className='mr-3 text-xl font-normal text-black'>
                    {userProfile?.username}
                  </h2>

                  {isProfile && (
                    <Link
                      to='/accounts/profile'
                      className='rounded-lg bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 hover:opacity-60'
                    >
                      Edit profile
                    </Link>
                  )}

                  {!isProfile && (
                    <div className='flex gap-2'>
                      <Button
                        className={classNames(
                          'flex h-8 w-24 items-center justify-center rounded-lg text-[0.8125rem] font-semibold',
                          {
                            'bg-gray-200 text-black': isFollowing,
                            'bg-blue-500 text-white': !isFollowing
                          }
                        )}
                        onClick={handleFollow}
                        isLoading={
                          followMutation.isPending || unfollowMutation.isPending
                        }
                        disabled={
                          followMutation.isPending || unfollowMutation.isPending
                        }
                        colorSpinner={
                          classNames('', {
                            dark: followMutation.isPending,
                            blue: unfollowMutation.isPending
                          }) as 'dark' | 'blue'
                        }
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>

                      <Dialog
                        as='button'
                        className='rounded-full hover:bg-gray-100'
                        isOpen={openOptions.menu}
                        setIsOpen={() => {
                          if (openOptions.menu)
                            setOpenOptions({
                              menu: false,
                              options: false,
                              block: false
                            });
                          else
                            setOpenOptions({
                              menu: true,
                              options: true,
                              block: false
                            });
                        }}
                        renderDialog={
                          <Modal
                            type='option'
                            onCloseModal={() => {
                              setOpenOptions({
                                menu: false,
                                options: false,
                                block: false
                              });
                            }}
                          >
                            <ul className='flex flex-col'>
                              {openOptions.options && (
                                <button
                                  className='p-3 font-semibold text-red-500'
                                  onClick={() =>
                                    setOpenOptions({
                                      menu: true,
                                      options: false,
                                      block: true
                                    })
                                  }
                                >
                                  Block
                                </button>
                              )}

                              {openOptions.block && (
                                <>
                                  <div className='border-b border-gray-300 p-6 text-center'>
                                    <h1 className='my-2 text-2xl'>
                                      Block user?
                                    </h1>
                                    <span className='text-sm font-light text-gray-500'>
                                      Are you sure you want to block this user?
                                    </span>
                                  </div>

                                  <button
                                    className='p-3 font-semibold text-red-500'
                                    onClick={() =>
                                      blockMutation.mutate(
                                        { userId: userId || '' },
                                        {
                                          onSuccess: () => {
                                            location.reload();
                                            setOpenOptions({
                                              menu: false,
                                              options: true,
                                              block: false
                                            });
                                          }
                                        }
                                      )
                                    }
                                  >
                                    Block
                                  </button>
                                </>
                              )}
                            </ul>
                          </Modal>
                        }
                      >
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
                      </Dialog>
                    </div>
                  )}
                </div>

                {/* Statistics */}
                <div className='mt-4 flex gap-4'>
                  <div className='font-normal'>
                    <span className='font-semibold text-black'>
                      {formatSocialNumber(userProfile?.postsCount || 0)}
                    </span>{' '}
                    posts
                  </div>

                  <button
                    className='font-normal active:opacity-50'
                    onClick={() =>
                      setOpenModalFollow({
                        follower: true,
                        following: false
                      })
                    }
                  >
                    <span className='font-semibold text-black'>
                      {formatSocialNumber(userProfile?.followersCount || 0)}
                    </span>{' '}
                    followers
                  </button>

                  <button
                    className='font-normal active:opacity-50'
                    onClick={() => {
                      setOpenModalFollow({
                        follower: false,
                        following: true
                      });
                    }}
                  >
                    <span className='font-semibold text-black'>
                      {userProfile?.followingCount || 0}
                    </span>{' '}
                    following
                  </button>

                  <Dialog
                    isOpen={
                      openModalFollow.follower || openModalFollow.following
                    }
                    setIsOpen={() => {
                      setOpenModalFollow({
                        follower: false,
                        following: false
                      });
                    }}
                    renderDialog={
                      <Modal
                        header={
                          openModalFollow.follower ? 'Followers' : 'Following'
                        }
                        onCloseModal={() =>
                          setOpenModalFollow({
                            follower: false,
                            following: false
                          })
                        }
                      >
                        <section className='overflow-y-auto'>
                          {openModalFollow.follower &&
                            List({
                              as: 'ul',
                              className: 'flex flex-col',
                              listItems: followers || [],
                              mapFn: follower => (
                                <div
                                  className='my-1 flex items-center justify-between px-4'
                                  key={follower._id}
                                >
                                  <div className='flex items-center gap-1'>
                                    <IconProfile
                                      className='h-12 w-12'
                                      classNameImage='h-12 w-12'
                                      src={follower.profilePicture}
                                      to={`/${follower._id}`}
                                      onClick={() => {
                                        setOpenModalFollow({
                                          follower: false,
                                          following: false
                                        });
                                      }}
                                    />

                                    <div className='flex flex-col text-sm'>
                                      <span className='text-sm font-medium text-black'>
                                        {follower.username}
                                      </span>
                                      <span className='text-[0.8125rem]'>
                                        {follower.userProfile.fullname}
                                      </span>
                                    </div>
                                  </div>

                                  {/* <button className='flex h-8 basis-20 items-center justify-center rounded-md bg-gray-100 text-[0.8125rem] font-semibold text-black'>
                                    Remove
                                  </button> */}
                                </div>
                              )
                            })}

                          {openModalFollow.following &&
                            List({
                              as: 'ul',
                              className: 'flex flex-col',
                              listItems: following || [],
                              mapFn: follower => (
                                <div
                                  className='flex items-center'
                                  key={follower._id}
                                >
                                  <div
                                    className='my-1 flex items-center justify-between px-4'
                                    key={follower._id}
                                  >
                                    <div className='flex items-center gap-1'>
                                      <IconProfile
                                        className='h-12 w-12'
                                        classNameImage='h-12 w-12'
                                        src={follower.profilePicture}
                                        to={`/${follower._id}`}
                                        onClick={() => {
                                          setOpenModalFollow({
                                            follower: false,
                                            following: false
                                          });
                                        }}
                                      />

                                      <div className='flex flex-col text-sm'>
                                        <span className='text-sm font-medium text-black'>
                                          {follower.username}
                                        </span>
                                        <span>
                                          {follower.userProfile.fullname}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </section>
                      </Modal>
                    }
                  >
                    <></>
                  </Dialog>
                </div>

                <>
                  <p className='mt-5 hidden text-sm font-medium text-black md:block'>
                    {userProfile?.fullname}
                  </p>
                  <p className='mt-4 max-w-[22rem] whitespace-pre-wrap text-sm font-normal text-black'>
                    {userProfile?.quote}
                  </p>
                </>
              </section>
            </header>

            <section className='mb-8 border-t border-gray-300'>
              <div className='flex justify-center gap-6 text-sm'>
                {buttonsFilter.map(({ value, isMatch, svg }, index) => (
                  <Button
                    key={index}
                    typeButton='filter'
                    value={value}
                    className='items-center gap-2 pt-4 active:opacity-60'
                    onClick={() => {
                      navigate(`/${userId}/${value}`);
                    }}
                    isMatch={isMatch}
                  >
                    {svg({ isMatch })}

                    <span
                      className={classNames(
                        `hidden text-base font-medium capitalize md:inline`,
                        {
                          'text-black': isMatch,
                          'text-gray-400': !isMatch
                        }
                      )}
                    >
                      {value || 'Post'}
                    </span>
                  </Button>
                ))}
              </div>
            </section>

            <article
              className={classNames('mb-2 flex flex-col gap-1', {
                'items-center': isLoadingProfile
              })}
            >
              {/* Default Post */}
              {!type &&
                List<Post>({
                  listItems: posts || [],
                  mapFn: post => <PostItem key={post._id} post={post} />,
                  as: 'ul',
                  className: 'mb-2 flex flex-col gap-4 items-center'
                })}

              {/* Saved Post */}
              {type === 'saved' && (
                <List
                  listItems={savedPosts}
                  mapFn={savedPost => (
                    <PostItem
                      key={savedPost._id}
                      post={{
                        ...savedPost,
                        profilePicture: savedPost.authorProfilePicture,
                        _id: savedPost.postId,
                        createdAt: savedPost.postCreatedDate,
                        username: savedPost.authorName
                      }}
                    />
                  )}
                  as='ul'
                  className='mb-2 flex flex-col items-center gap-2'
                />
              )}

              {/* Images Post */}
              {type === 'images' && (
                <>
                  {/* Convert this to map function */}
                  {Array.from({ length: Math.ceil(imagePosts.length / 3) }).map(
                    (_, index, arr) => {
                      if (index !== arr.length - 1) {
                        return (
                          <div className='flex gap-1' key={index}>
                            <ImageItem post={imagePosts[index]} />
                            <ImageItem post={imagePosts[index + 1]} />
                            <ImageItem post={imagePosts[index + 2]} />
                          </div>
                        );
                      } else {
                        return (
                          <div className='flex gap-1' key={index}>
                            {Array.from({
                              length: imagePosts.length - index * 3
                            }).map((_, idx) => {
                              return (
                                <ImageItem
                                  post={imagePosts[idx + index * 3]}
                                  key={idx}
                                />
                              );
                            })}
                          </div>
                        );
                      }
                    }
                  )}
                </>
              )}
            </article>
          </>
        )}
      </div>
    </main>
  );
}
