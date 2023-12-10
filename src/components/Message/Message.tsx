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
        {item.body !== default_image_sent_message && (
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
          {formatMessageDateTime(new Date(item.createdAt))}
        </div>
      </div>
    </div>
  );
};

export default Message;
