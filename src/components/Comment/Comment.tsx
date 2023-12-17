import { useEffect, useRef, useState } from 'react';
import IconProfile from '../IconProfile';
import { IComment } from 'src/types/comment.type';
import {
  calculateTimeAgo,
  formatDate,
  formatSocialNumber,
  handleTextAreaChange
} from 'src/utils/helper';
import { useAppContext } from 'src/contexts/app.contexts';
import Dialog from '../Dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import commentApi from 'src/apis/comment.api';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { toast } from 'react-toastify';

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  const { profile } = useAppContext();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(() => {
    if (comment.comment.length > 100) {
      return true;
    }
    return false;
  });
  const queryClient = useQueryClient();
  const [openOptions, setOpenOptions] = useState({
    openDialog: false,
    options: false,
    delete: false
  });

  const isOwner = comment.username === profile?.username;
  const commentText = showSeeMore
    ? `${comment.comment.slice(0, 100)}...`
    : comment.comment;

  const deleteCommentMutation = useMutation({
    mutationFn: () =>
      commentApi.deleteComment({
        commentId: comment._id,
        postId: comment.postId
      }),
    onSuccess: () => {
      toast.success('Delete comment successfully!', {
        position: 'top-right'
      });
      setOpenOptions({
        ...openOptions,
        openDialog: false
      });
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['comments', comment.postId]
        });
      }, 1000);
    }
  });

  // Form data for comment and submit comment
  const updateCommentMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      commentApi.updateComment({
        commentId: comment._id,
        content: content,
        profilePicture: comment.profilePicture
      })
  });
  const { register, handleSubmit, watch, reset, setValue } = useForm<{
    comment: string;
  }>();
  const watchContentComment = watch('comment');
  const registerComment = register('comment');
  const updateComment = handleSubmit(data => {
    updateCommentMutation.mutate(
      {
        content: data.comment
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ['comments', comment.postId]
            });
          }, 500);
        }
      }
    );
    reset();
  });

  // Get Data for comments
  // const { data: commentsData, isLoading: isLoadingComment } = useQuery({
  //   queryKey: ['comments', comment._id],
  //   queryFn: () =>
  //     commentApi.getCommentById({
  //       postId: comment.postId,
  //       commentId: comment._id
  //     })
  // });
  // console.log(commentsData?.data.singleComment[0]);

  useEffect(() => {
    if (isEditing) handleTextAreaChange(textAreaRef);
  }, [isEditing]);

  return (
    <div className='px-4 py-2'>
      <div className='flex items-start gap-2'>
        <IconProfile
          className='h-8 w-8 flex-shrink-0'
          classNameImage='h-8 w-8'
          src={comment.profilePicture}
          to={`${comment.userId}`}
        />

        <div
          className={classNames(
            'flex max-w-fit flex-grow flex-col overflow-y-hidden text-sm',
            {
              'max-w-fit': !isEditing,
              'max-w-full': isEditing
            }
          )}
        >
          <div className='flex flex-col items-start gap-1'>
            {!isEditing && (
              <>
                <div className={'flex max-w-full items-center'}>
                  <div
                    className={classNames(
                      'max-w-full overflow-x-hidden overflow-y-hidden rounded-2xl bg-gray-100 p-2 pt-1'
                    )}
                  >
                    <span className='-mt-1 mb-1 w-fit text-xs font-semibold'>
                      {comment.username}
                    </span>
                    <div className='text-regular w-full overflow-y-hidden whitespace-pre-wrap break-words font-normal text-gray-700'>
                      {commentText}
                      {comment.comment.length > 100 && (
                        <button
                          onClick={() => setShowSeeMore(!showSeeMore)}
                          className='pl-1 font-medium text-gray-950 hover:underline'
                        >
                          {`See ${showSeeMore ? 'more' : 'less'}`}
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    className='relative flex h-6 w-6 items-center justify-center'
                    // onClick={() => {
                    //   if (!liked) likePostMutation.mutate(post._id || '');
                    //   else unlikeMutation.mutate(post._id || '');
                    // }}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      className={classNames(
                        'absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300',
                        {
                          'opacity-0': !false
                        }
                      )}
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z'
                        className={classNames('fill-red-500', {
                          'opacity-0': !false
                        })}
                      />
                    </svg>

                    <svg
                      viewBox='0 0 24 24'
                      className={classNames(
                        'absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 fill-gray-500  transition-opacity duration-300',
                        {
                          'opacity-0': false,
                          'opacity-100': !false
                        }
                      )}
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g clipPath='url(#clip0_62_120)'>
                        <path d='M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z' />
                      </g>
                      <defs>
                        <clipPath id='clip0_62_120'>
                          <rect width='24' height='24' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>

                <ul className='flex items-center text-xs text-gray-600'>
                  <span className='mx-2 font-normal'>
                    {calculateTimeAgo(comment.createdAt)}
                  </span>
                  <span className='mx-2 font-semibold'>
                    {formatSocialNumber(1000)} like
                  </span>
                  {/* Edit comment */}
                  {isOwner && (
                    <Dialog
                      isOpen={openOptions.openDialog}
                      setIsOpen={() => {
                        !openOptions.openDialog
                          ? setOpenOptions({
                              openDialog: true,
                              options: true,
                              delete: false
                            })
                          : setOpenOptions({
                              openDialog: false,
                              options: false,
                              delete: false
                            });
                      }}
                      renderDialog={
                        <div className='text-normal flex w-[28rem] flex-col rounded-lg bg-white text-base font-normal text-black'>
                          {openOptions.options && (
                            <>
                              {/* Delete */}
                              <button
                                className='p-3 font-semibold text-red-500'
                                onClick={() => {
                                  setOpenOptions(prev => ({
                                    ...prev,
                                    options: false,
                                    delete: true
                                  }));
                                }}
                              >
                                Deleted
                              </button>
                              {/* Edit */}
                              <button
                                className='border-t p-3 font-semibold text-red-500'
                                onClick={() => {
                                  setIsEditing(true);
                                  setValue('comment', comment.comment);
                                  setOpenOptions({
                                    options: false,
                                    delete: false,
                                    openDialog: false
                                  });
                                }}
                              >
                                Edit
                              </button>
                              {/* Cancel */}
                              <button
                                className='border-t p-3 font-semibold'
                                onClick={() =>
                                  setOpenOptions({
                                    options: false,
                                    delete: false,
                                    openDialog: false
                                  })
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {openOptions.delete && (
                            <>
                              <div className='border-b p-6 text-center'>
                                <h1 className='my-2 text-2xl'>
                                  Delete comment?
                                </h1>
                                <span className='text-sm font-light text-gray-500'>
                                  Are you sure you want to delete this comment?
                                </span>
                              </div>

                              <button
                                className='border-b p-3 font-semibold text-red-500'
                                onClick={() => {
                                  deleteCommentMutation.mutate();
                                }}
                              >
                                Deleted
                              </button>

                              <button
                                onClick={() => {
                                  setOpenOptions({
                                    options: false,
                                    delete: false,
                                    openDialog: false
                                  });
                                }}
                                className='py-3 font-light'
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      }
                      className='flex items-center'
                    >
                      <button className='flex min-h-[2rem] min-w-[2rem] items-center justify-center '>
                        <span className='opacity-0 hover:opacity-100'>
                          <svg
                            viewBox='0 0 32 32'
                            className='h-5 w-5 fill-gray-700'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M18 16C18 16.3956 17.8827 16.7822 17.6629 17.1111C17.4432 17.44 17.1308 17.6964 16.7654 17.8478C16.3999 17.9991 15.9978 18.0387 15.6098 17.9616C15.2219 17.8844 14.8655 17.6939 14.5858 17.4142C14.3061 17.1345 14.1156 16.7781 14.0384 16.3902C13.9613 16.0022 14.0009 15.6001 14.1522 15.2346C14.3036 14.8692 14.56 14.5568 14.8889 14.3371C15.2178 14.1173 15.6044 14 16 14C16.5304 14 17.0391 14.2107 17.4142 14.5858C17.7893 14.9609 18 15.4696 18 16ZM7.5 14C7.10444 14 6.71776 14.1173 6.38886 14.3371C6.05996 14.5568 5.80362 14.8692 5.65224 15.2346C5.50087 15.6001 5.46126 16.0022 5.53843 16.3902C5.6156 16.7781 5.80608 17.1345 6.08579 17.4142C6.36549 17.6939 6.72186 17.8844 7.10982 17.9616C7.49778 18.0387 7.89992 17.9991 8.26537 17.8478C8.63082 17.6964 8.94318 17.44 9.16294 17.1111C9.3827 16.7822 9.5 16.3956 9.5 16C9.5 15.4696 9.28929 14.9609 8.91421 14.5858C8.53914 14.2107 8.03043 14 7.5 14ZM24.5 14C24.1044 14 23.7178 14.1173 23.3889 14.3371C23.06 14.5568 22.8036 14.8692 22.6522 15.2346C22.5009 15.6001 22.4613 16.0022 22.5384 16.3902C22.6156 16.7781 22.8061 17.1345 23.0858 17.4142C23.3655 17.6939 23.7219 17.8844 24.1098 17.9616C24.4978 18.0387 24.8999 17.9991 25.2654 17.8478C25.6308 17.6964 25.9432 17.44 26.1629 17.1111C26.3827 16.7822 26.5 16.3956 26.5 16C26.5 15.4696 26.2893 14.9609 25.9142 14.5858C25.5391 14.2107 25.0304 14 24.5 14Z' />
                          </svg>
                        </span>
                      </button>
                    </Dialog>
                  )}
                </ul>
              </>
            )}

            {/* Content */}
            {isEditing && (
              <form onSubmit={updateComment}>
                <div className='flex gap-2'>
                  {/* Input */}
                  <div className='grow rounded-3xl bg-gray-100'>
                    <div className='flex flex-col'>
                      <textarea
                        className='h-9 w-full flex-grow resize-none overflow-y-hidden bg-transparent p-2 text-sm font-normal text-gray-700 outline-none transition-all'
                        placeholder='Write a comment...'
                        onChange={event => {
                          registerComment.onChange(event);
                          handleTextAreaChange(textAreaRef);
                        }}
                        ref={e => {
                          registerComment.ref(e);
                          textAreaRef.current = e;
                        }}
                        name={registerComment.name}
                        onKeyDown={e => {
                          if (e.key === 'Escape') {
                            setIsEditing(false);
                          } else if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            updateComment();
                          }
                        }}
                      />

                      {watchContentComment !== '' && (
                        <button
                          className='mb-1 mr-3 flex h-8 w-8 items-center justify-center self-end rounded-full hover:bg-gray-200'
                          type='submit'
                        >
                          <span className='ml-[0.2rem] mt-[0.05rem] flex items-center justify-center'>
                            <svg
                              width='23'
                              height='24'
                              viewBox='0 0 23 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M18.735 10.71L5.16001 3.40499C4.02001 2.78999 2.70001 3.85499 3.06001 5.09999L4.92001 11.61C4.99501 11.88 4.99501 12.15 4.92001 12.42L3.06001 18.93C2.70001 20.175 4.02001 21.24 5.16001 20.625L18.735 13.32C18.9666 13.1935 19.1599 13.0069 19.2945 12.7799C19.4291 12.5529 19.5002 12.2939 19.5002 12.03C19.5002 11.7661 19.4291 11.507 19.2945 11.2801C19.1599 11.0531 18.9666 10.8665 18.735 10.74V10.71Z'
                                fill='#3B82F6'
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
