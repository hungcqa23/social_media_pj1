import Profile from '../IconProfile';

interface Props {
  isActive?: boolean;
  newMessage?: boolean;
  userAvatar?: string;
  onClick?: () => void;
}
export default function MessageUser({
  isActive,
  newMessage,
  userAvatar,
  onClick
}: Props) {
  return (
    <button
      className='flex w-full items-center px-6 py-3 hover:bg-gray-100'
      onClick={onClick}
    >
      <Profile
        classNameImage='h-14 w-14 rounded-full object-cover'
        className='mr-2 block h-14 w-14'
        src={userAvatar}
        isImage
      />
      <div className='flex flex-col items-start'>
        <div>
          <span className='text-lg font-semibold '>An Hung</span>
        </div>
        <div>
          {newMessage && (
            <span className='text-sm font-medium text-black'>New message</span>
          )}
          {!newMessage && (
            <span className='text-sm text-gray-400'>
              Active {isActive ? 'now' : 'recently'}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
