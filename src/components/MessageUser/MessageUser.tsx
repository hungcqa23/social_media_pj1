import { IMessageData } from 'src/types/conversation.type';
import Profile from '../IconProfile';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.contexts';
import { formatTimeDifference } from 'src/utils/utils';

interface Props {
  item: IMessageData;
  onClick?: () => void;
}
export default function MessageUser({ item, onClick }: Props) {
  const { profile } = useContext(AppContext);
  return (
    <button
      className='flex w-full items-center gap-3 overflow-x-hidden px-6 py-3 hover:bg-gray-100'
      onClick={onClick}
    >
      <Profile
        classNameImage='h-14 w-14 rounded-full object-cover outline outline-1 outline-slate-200 outline-offset-2'
        className='block h-14 w-14 min-w-[3.5rem] min-h-[3.5rem]'
        src={
          profile?._id === item.receiverId
            ? item.senderProfilePicture
            : item.receiverProfilePicture
        }
        isImage
      />
      <div className='flex h-[100%] w-[calc(100%-3.5rem)] flex-col items-start justify-between'>
        <div>
          <span className='text-lg font-semibold '>
            {profile?._id === item.receiverId
              ? item.senderUsername
              : item.receiverUsername}
          </span>
        </div>
        <div className='flex w-5/6 flex-col items-start'>
          <span
            className={`w-full text-sm ${
              !item.isRead && item.senderId !== profile?._id
                ? 'font-medium text-black'
                : 'font-light text-slate-500'
            }`}
          >
            <div className='flex w-full flex-row items-center'>
              <p className='w-fit max-w-[70%] overflow-x-hidden truncate text-left'>
                {item.senderId === profile?._id ? 'You: ' : null} {item.body}
              </p>
              <p className='w-fit min-w-[30%]'>
                • {formatTimeDifference(new Date(item.createdAt))}
              </p>
            </div>
          </span>
        </div>
      </div>
    </button>
  );
}
