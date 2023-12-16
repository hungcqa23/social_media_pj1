import { useEffect, useRef, useState } from 'react';
import Profile from '../../../components/IconProfile';
import { convertFileToBase64 } from 'src/utils/file';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from 'src/apis/post.api';
import { Post } from 'src/types/post.type';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useAppContext } from 'src/contexts/app.contexts';
import Header from './Header/Header';

interface Props {
  closeModal: () => void;
  includesMedia: boolean;
  setIncludesMedia: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  closeModal,
  includesMedia,
  setIncludesMedia
}: Props) {
  const { profile } = useAppContext();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  // Form data
  const { register, handleSubmit, watch } = useForm();
  const watchContent = watch('content');

  const { onChange, name, ref } = register('content');
  const createPostWithMediaMutation = useMutation({
    mutationFn: (
      body: Post & {
        image?: string;
      }
    ) => postApi.createPostWithMedia(body)
  });
  const createPostMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postApi.createPost({
        content,
        profilePicture: profile?.profilePicture || ''
      })
  });
  useEffect(() => {
    return () => {
      setIncludesMedia(false);
    };
  }, [setIncludesMedia]);
  const handleTextAreaChange = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      // Reset the height to auto to adjust to content
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
      // Set the height to the scrollHeight
    }
  };
  const handleOpenFile = () => {
    inputRef?.current?.click();
  };

  const onSubmit = handleSubmit(async data => {
    const stringBase64 = file ? await convertFileToBase64(file) : '';
    if (file) {
      createPostWithMediaMutation.mutate(
        {
          post: data.content,
          profilePicture: profile?.profilePicture,
          image: stringBase64,
          privacy: 'public'
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Create post successfully!', {
              position: toast.POSITION.TOP_RIGHT
            });
            closeModal();
          },
          onError: () => {
            toast.error('Create post failed!', {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        }
      );
    } else {
      createPostMutation.mutate(
        {
          content: data.content
        },
        {
          onSuccess: () => {
            toast.success('Create post successfully!', {
              position: toast.POSITION.TOP_RIGHT
            });
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['posts'] });
          },
          onError: () => {
            toast.error('Create post failed!', {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        }
      );
    }
  });
  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const onCloseFile = () => {
    setFile(null);
    setIncludesMedia(false);
  };

  return (
    <form
      className={`flex min-h-[30rem] w-[33rem] flex-col justify-between rounded-lg bg-white shadow`}
      onSubmit={onSubmit}
    >
      {/* Header */}
      {/* <header className='relative flex h-14 items-center justify-center border-b p-5'>
          <div className='text-xl font-bold text-black'>Create post</div>
          <button
            className='top-[calc((100% - 2.25rem) / 2)] absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200'
            type='button'
            onClick={closeModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 384 512'
              className='h-6 fill-gray-500'
            >
              <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
            </svg>
          </button>
        </header> */}
      <Header closeModal={closeModal} />

      {/* Content */}
      <div className='flex flex-grow flex-col justify-between overflow-y-auto'>
        {/* Profile */}
        <div className='mx-4 flex items-center py-3'>
          <Profile
            to='/profile'
            className='mr-2 h-11 w-11'
            src={profile?.profilePicture}
          />
          <div>
            <div>
              <span className='font-semibold'>An Hưng</span>
            </div>

            {/* Set scope post */}
            {/* <div className='flex h-6 items-center gap-1 rounded bg-gray-200 px-2'>
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17 9V7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7V9C5.3 9 4 10.3 4 12V19C4 20.7 5.3 22 7 22H17C18.7 22 20 20.7 20 19V12C20 10.3 18.7 9 17 9ZM9 7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V9H9V7Z'
                    fill='black'
                  />
                </svg>
              </span>
              <span className='text-[0.8125rem] font-medium text-black'>
                Public
              </span>
              <span>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 6.3335L8 10.3335L4 6.3335H12Z'
                    fill='black'
                    stroke='black'
                    strokeWidth='4'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div> */}
          </div>
        </div>

        {/* Create Content */}
        <div className='flex flex-grow flex-col justify-between overflow-y-auto'>
          {/* Text */}
          <div className='overflow-y-auto'>
            <div className='w-full px-4'>
              <textarea
                className='max-h-40 w-full resize-none overflow-auto whitespace-pre-wrap text-base font-normal text-black placeholder:text-gray-600 focus:outline-none'
                placeholder={`What's on your mind, ${profile?.fullname} ?`}
                onChange={event => {
                  onChange(event);
                  handleTextAreaChange();
                }}
                name={name}
                ref={e => {
                  ref(e);
                  textAreaRef.current = e;
                }}
              />
            </div>

            {/* Media */}
            {(file || includesMedia) && (
              <div className='w-full px-4'>
                <div className='h-40'>
                  <div
                    className={classNames(`rounded-lg border`, {
                      'h-full': !file
                    })}
                  >
                    <div className='h-full p-2'>
                      <div className='relative h-full'>
                        {!file && includesMedia && (
                          <button
                            className='hover:pointer flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-50 outline-none hover:bg-gray-100'
                            onClick={handleOpenFile}
                            type='button'
                          >
                            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-200'>
                              <span>
                                <svg
                                  width='36'
                                  height='36'
                                  viewBox='0 0 36 36'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M30.375 5.625H10.125C9.52826 5.625 8.95597 5.86205 8.53401 6.28401C8.11205 6.70597 7.875 7.27826 7.875 7.875V10.125H5.625C5.02826 10.125 4.45597 10.3621 4.03401 10.784C3.61205 11.206 3.375 11.7783 3.375 12.375V28.125C3.375 28.7217 3.61205 29.294 4.03401 29.716C4.45597 30.1379 5.02826 30.375 5.625 30.375H25.875C26.4717 30.375 27.044 30.1379 27.466 29.716C27.8879 29.294 28.125 28.7217 28.125 28.125V25.875H30.375C30.9717 25.875 31.544 25.6379 31.966 25.216C32.3879 24.794 32.625 24.2217 32.625 23.625V7.875C32.625 7.27826 32.3879 6.70597 31.966 6.28401C31.544 5.86205 30.9717 5.625 30.375 5.625ZM24.1875 10.125C24.5213 10.125 24.8475 10.224 25.125 10.4094C25.4025 10.5948 25.6188 10.8584 25.7465 11.1667C25.8743 11.4751 25.9077 11.8144 25.8426 12.1417C25.7775 12.4691 25.6167 12.7697 25.3807 13.0057C25.1447 13.2417 24.8441 13.4025 24.5167 13.4676C24.1894 13.5327 23.8501 13.4993 23.5417 13.3715C23.2334 13.2438 22.9698 13.0275 22.7844 12.75C22.599 12.4725 22.5 12.1463 22.5 11.8125C22.5 11.3649 22.6778 10.9357 22.9943 10.6193C23.3107 10.3028 23.7399 10.125 24.1875 10.125ZM25.875 28.125H5.625V12.375H7.875V23.625C7.875 24.2217 8.11205 24.794 8.53401 25.216C8.95597 25.6379 9.52826 25.875 10.125 25.875H25.875V28.125ZM30.375 23.625H10.125V18.5625L15.1875 13.5L22.1709 20.4834C22.3819 20.6943 22.6679 20.8127 22.9662 20.8127C23.2644 20.8127 23.5504 20.6943 23.7614 20.4834L27.3698 16.875L30.375 19.8816V23.625Z'
                                    fill='black'
                                  />
                                </svg>
                              </span>
                            </div>
                            <span className='font-medium text-black'>
                              Add photos/videos
                            </span>
                          </button>
                        )}

                        {file && (
                          <div className='p-2'>
                            <img
                              src={URL.createObjectURL(file)}
                              alt='User Upload'
                              className='h-full w-full rounded-md'
                            />
                          </div>
                        )}

                        <button
                          className='absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-gray-100'
                          onClick={onCloseFile}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 384 512'
                            className='h-5 fill-gray-500'
                          >
                            <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-4 px-4 py-4'>
            <div className='flex items-center justify-between rounded-md border p-4 shadow'>
              <span className='font-medium text-black'>Add to your post</span>
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 ${
                  includesMedia && 'bg-gray-100'
                }`}
                onClick={() => setIncludesMedia(true)}
                type='button'
              >
                <span>
                  <span>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 36 36'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M30.375 5.625H10.125C9.52826 5.625 8.95597 5.86205 8.53401 6.28401C8.11205 6.70597 7.875 7.27826 7.875 7.875V10.125H5.625C5.02826 10.125 4.45597 10.3621 4.03401 10.784C3.61205 11.206 3.375 11.7783 3.375 12.375V28.125C3.375 28.7217 3.61205 29.294 4.03401 29.716C4.45597 30.1379 5.02826 30.375 5.625 30.375H25.875C26.4717 30.375 27.044 30.1379 27.466 29.716C27.8879 29.294 28.125 28.7217 28.125 28.125V25.875H30.375C30.9717 25.875 31.544 25.6379 31.966 25.216C32.3879 24.794 32.625 24.2217 32.625 23.625V7.875C32.625 7.27826 32.3879 6.70597 31.966 6.28401C31.544 5.86205 30.9717 5.625 30.375 5.625ZM24.1875 10.125C24.5213 10.125 24.8475 10.224 25.125 10.4094C25.4025 10.5948 25.6188 10.8584 25.7465 11.1667C25.8743 11.4751 25.9077 11.8144 25.8426 12.1417C25.7775 12.4691 25.6167 12.7697 25.3807 13.0057C25.1447 13.2417 24.8441 13.4025 24.5167 13.4676C24.1894 13.5327 23.8501 13.4993 23.5417 13.3715C23.2334 13.2438 22.9698 13.0275 22.7844 12.75C22.599 12.4725 22.5 12.1463 22.5 11.8125C22.5 11.3649 22.6778 10.9357 22.9943 10.6193C23.3107 10.3028 23.7399 10.125 24.1875 10.125ZM25.875 28.125H5.625V12.375H7.875V23.625C7.875 24.2217 8.11205 24.794 8.53401 25.216C8.95597 25.6379 9.52826 25.875 10.125 25.875H25.875V28.125ZM30.375 23.625H10.125V18.5625L15.1875 13.5L22.1709 20.4834C22.3819 20.6943 22.6679 20.8127 22.9662 20.8127C23.2644 20.8127 23.5504 20.6943 23.7614 20.4834L27.3698 16.875L30.375 19.8816V23.625Z'
                        fill='black'
                      />
                    </svg>
                  </span>
                </span>
                <input
                  type='file'
                  className='hidden'
                  ref={inputRef}
                  accept='image/*'
                  onChange={onChangeFile}
                />
              </button>
            </div>

            {/* Submit button */}
            <button
              disabled={
                (watchContent === '' && file === null) ||
                createPostWithMediaMutation.isPending ||
                createPostMutation.isPending
              }
              className='block h-10 w-full rounded-md bg-blue-600 text-center text-sm font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300'
            >
              <span className='text-base font-semibold text-white'>Post</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
