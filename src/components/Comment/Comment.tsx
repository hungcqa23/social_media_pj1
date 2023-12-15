import { useState } from 'react';
import IconProfile from '../IconProfile';
import { IComment } from 'src/types/comment.type';
import { formatSocialNumber } from 'src/utils/helper';
import { useAppContext } from 'src/contexts/app.contexts';
import Dialog from '../Dialog';

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  const { profile } = useAppContext();
  // const [hover, setHover] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(() => {
    if (comment.comment.length > 100) {
      return true;
    }
    return false;
  });
  const [openOptions, setOpenOptions] = useState({
    openDialog: false,
    options: false,
    delete: false
  });

  const isOwner = comment.username === profile?.username;
  const commentText = showSeeMore
    ? `${comment.comment.slice(0, 100)}...`
    : comment.comment;
  console.log(openOptions);
  return (
    <div className='px-4 py-2'>
      <div
        className='flex items-start gap-2'
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
      >
        <IconProfile
          className='h-8 w-8 flex-shrink-0'
          classNameImage='h-8 w-8'
          src={comment.profilePicture}
        />

        <div className='flex max-w-fit flex-grow flex-col overflow-y-hidden text-sm'>
          <div className='flex items-center gap-2'>
            <div className='max-w-full overflow-x-hidden overflow-y-hidden rounded-2xl bg-gray-100 p-2 pt-1'>
              <span className='-mt-1 mb-1 w-fit text-xs font-semibold'>
                {comment.username}
              </span>

              {/* Content */}
              <div>
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
            </div>

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
                        <button
                          className='p-3 font-semibold text-red-500'
                          onClick={() => {
                            console.log('Deleted button');
                            setOpenOptions(prev => ({
                              ...prev,
                              options: false,
                              delete: true
                            }));
                          }}
                        >
                          Deleted
                        </button>

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
                          <h1 className='my-2 text-2xl'>Delete post?</h1>
                          <span className='text-sm font-light text-gray-500'>
                            Are you sure you want to delete this post?
                          </span>
                        </div>

                        <button
                          className='border-b p-3 font-semibold text-red-500'
                          // onClick={handleDeletePost}
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
                <button className='min-h-[2rem] min-w-[2rem] rounded-full hover:bg-gray-100'>
                  {
                    <span>
                      <svg
                        width='32'
                        height='32'
                        viewBox='0 0 32 32'
                        className='fill-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M18 16C18 16.3956 17.8827 16.7822 17.6629 17.1111C17.4432 17.44 17.1308 17.6964 16.7654 17.8478C16.3999 17.9991 15.9978 18.0387 15.6098 17.9616C15.2219 17.8844 14.8655 17.6939 14.5858 17.4142C14.3061 17.1345 14.1156 16.7781 14.0384 16.3902C13.9613 16.0022 14.0009 15.6001 14.1522 15.2346C14.3036 14.8692 14.56 14.5568 14.8889 14.3371C15.2178 14.1173 15.6044 14 16 14C16.5304 14 17.0391 14.2107 17.4142 14.5858C17.7893 14.9609 18 15.4696 18 16ZM7.5 14C7.10444 14 6.71776 14.1173 6.38886 14.3371C6.05996 14.5568 5.80362 14.8692 5.65224 15.2346C5.50087 15.6001 5.46126 16.0022 5.53843 16.3902C5.6156 16.7781 5.80608 17.1345 6.08579 17.4142C6.36549 17.6939 6.72186 17.8844 7.10982 17.9616C7.49778 18.0387 7.89992 17.9991 8.26537 17.8478C8.63082 17.6964 8.94318 17.44 9.16294 17.1111C9.3827 16.7822 9.5 16.3956 9.5 16C9.5 15.4696 9.28929 14.9609 8.91421 14.5858C8.53914 14.2107 8.03043 14 7.5 14ZM24.5 14C24.1044 14 23.7178 14.1173 23.3889 14.3371C23.06 14.5568 22.8036 14.8692 22.6522 15.2346C22.5009 15.6001 22.4613 16.0022 22.5384 16.3902C22.6156 16.7781 22.8061 17.1345 23.0858 17.4142C23.3655 17.6939 23.7219 17.8844 24.1098 17.9616C24.4978 18.0387 24.8999 17.9991 25.2654 17.8478C25.6308 17.6964 25.9432 17.44 26.1629 17.1111C26.3827 16.7822 26.5 16.3956 26.5 16C26.5 15.4696 26.2893 14.9609 25.9142 14.5858C25.5391 14.2107 25.0304 14 24.5 14Z' />
                      </svg>
                    </span>
                  }
                </button>
              </Dialog>
            )}
          </div>

          <ul className='text-xs text-gray-600'>
            <span className='mx-2 font-normal'>1w</span>
            <button className='mx-2 font-semibold'>
              {formatSocialNumber(1000)} like
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
