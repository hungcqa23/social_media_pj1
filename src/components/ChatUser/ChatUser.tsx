import { IMessageData } from 'src/types/conversation.type';
import Profile from '../IconProfile';
import { User } from 'src/types/user.type';

interface Props {
  item: User;
  onClick?: () => void;
}
export default function ChatUser({ item, onClick }: Props) {
  return (
    <button
      className='flex w-full items-center gap-3 overflow-x-hidden rounded-lg px-3 py-3 hover:bg-gray-100'
      onClick={onClick}
    >
      <Profile
        classNameImage='h-10 w-10 outline outline-1 outline-slate-200 outline-offset-2'
        className='h-10 w-10'
        src={item.profilePicture}
        isImage
      />
      <div className='flex h-[100%] w-[calc(100%-3.5rem)] flex-col items-start justify-between'>
        <span className='text-sm font-semibold'>{item.username}</span>
        <div className='flex w-5/6 flex-col items-start'>
          <span className='w-fit max-w-[90%] overflow-x-hidden truncate text-left text-sm text-gray-400'>
            {item.fullname}
          </span>
        </div>
      </div>
    </button>
  );
}
