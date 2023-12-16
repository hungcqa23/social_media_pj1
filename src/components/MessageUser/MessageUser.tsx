import { IMessageData } from 'src/types/conversation.type';
import Profile from '../IconProfile';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.contexts';

interface Props {
  item: IMessageData;
  onClick?: () => void;
}
export default function MessageUser({ item, onClick }: Props) {
  const { profile } = useContext(AppContext);
  return (
    <button
      className='flex w-full items-center gap-1 overflow-x-hidden px-6 py-3 hover:bg-gray-100'
      onClick={onClick}
    >
      <Profile
        classNameImage='h-14 w-14 rounded-full object-cover'
        className='block h-14 w-14'
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
              !item.isRead ? 'font-medium' : 'font-normal text-slate-500'
            } text-slate-600`}
          >
            <p className='w-full overflow-x-hidden truncate text-left'>
              {item.body}
            </p>
          </span>
        </div>
      </div>
    </button>
  );
}
