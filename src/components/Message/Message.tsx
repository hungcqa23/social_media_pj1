import { IMessageData } from 'src/types/conversation.type';
import { formatMessageDateTime } from 'src/utils/utils';

interface Props {
  item: IMessageData;
  isReceived: boolean;
}

export const default_image_sent_message = 'Sent an image';

const Message = ({ item, isReceived }: Props) => {
  return (
    <div
      className={`flex w-full items-center ${
        isReceived ? 'justify-start' : 'justify-end'
      } p-5`}
    >
      <div
        className={`flex max-w-[50%] flex-col ${
          isReceived ? 'items-start' : 'items-end'
        } justify-center`}
      >
        {(item.isAudioCall || item.isVideoCall) && (
          <div className='flex w-fit items-center justify-center gap-4 rounded-lg bg-slate-100 p-4 font-normal text-black'>
            <svg
              width={24}
              height={24}
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H14.25C14.8467 5.25 15.419 5.48705 15.841 5.90901C16.2629 6.33097 16.5 6.90326 16.5 7.5V16.5C16.5 17.0967 16.2629 17.669 15.841 18.091C15.419 18.5129 14.8467 18.75 14.25 18.75H5.25C4.65326 18.75 4.08097 18.5129 3.65901 18.091C3.23705 17.669 3 17.0967 3 16.5V7.5ZM5.25 3.75C4.25544 3.75 3.30161 4.14509 2.59835 4.84835C1.89509 5.55161 1.5 6.50544 1.5 7.5V16.5C1.5 17.4946 1.89509 18.4484 2.59835 19.1517C3.30161 19.8549 4.25544 20.25 5.25 20.25H14.25C14.7425 20.25 15.2301 20.153 15.6851 19.9645C16.14 19.7761 16.5534 19.4999 16.9017 19.1517C17.2499 18.8034 17.5261 18.39 17.7145 17.9351C17.903 17.4801 18 16.9925 18 16.5V15.75L20.7 17.775C20.8671 17.9004 21.0659 17.9767 21.274 17.9955C21.482 18.0142 21.6912 17.9747 21.8781 17.8812C22.065 17.7878 22.2221 17.6442 22.332 17.4664C22.4418 17.2887 22.5 17.0839 22.5 16.875V7.1325C22.5 6.92357 22.4418 6.71878 22.332 6.54105C22.2221 6.36333 22.065 6.2197 21.8781 6.12627C21.6912 6.03283 21.482 5.99328 21.274 6.01205C21.0659 6.03081 20.8671 6.10714 20.7 6.2325L18 8.25V7.5C18 7.00754 17.903 6.51991 17.7145 6.06494C17.5261 5.60997 17.2499 5.19657 16.9017 4.84835C16.5534 4.50013 16.14 4.22391 15.6851 4.03545C15.2301 3.847 14.7425 3.75 14.25 3.75H5.25ZM18 10.125L21 7.881V16.125L18 13.875V10.125Z'
                fill='black'
              />
            </svg>
            <span className='cursor-default'>
              {item.isAudioCall ? 'Audio Call' : 'Video Call'}
            </span>
          </div>
        )}
        {item.body !== default_image_sent_message &&
          !item.isAudioCall &&
          !item.isVideoCall && (
            <div
              className={`rounded-br-0 flex w-fit items-center justify-start rounded-bl-lg rounded-tl-lg rounded-tr-lg ${
                isReceived ? 'bg-sky-50 text-black' : 'bg-sky-500 text-white'
              } p-2`}
            >
              {item.body}
            </div>
          )}
        {item.selectedImage && (
          <div className='mt-1 flex w-[70%] items-center justify-center rounded-lg'>
            <img
              className='rounded-lg object-cover'
              src={item.selectedImage}
              alt='img'
            />
          </div>
        )}
        <div
          className={`flex w-full ${
            isReceived ? 'justify-start' : 'justify-end'
          }`}
        >
          {formatMessageDateTime(new Date(item.createdAt))}{' '}
          {item.isRead ? 'read' : 'unread'}
        </div>
      </div>
    </div>
  );
};

export default Message;
