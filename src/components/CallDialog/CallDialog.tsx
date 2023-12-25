import { ISender } from 'src/App';

type Props = {
  sender: ISender;
  onAccept: () => void;
  onReject: () => void;
};

const CallDialog = ({ sender, onAccept, onReject }: Props) => {
  return (
    <div className='flex h-96 w-96 flex-col items-center justify-center gap-2 rounded-lg bg-white p-3'>
      <div className='flex max-h-[8rem] max-w-[8rem] items-center justify-center'>
        <img
          className='h-full max-h-full w-full max-w-full rounded-full object-cover'
          src={sender?.userProfilePicture}
          alt='Profile'
        />
      </div>
      <p>
        <b>{sender?.username}</b> is calling...
      </p>
      <div className='mt-5 flex flex-row items-center justify-center gap-10'>
        <button
          className='min-w-[6rem] rounded-lg bg-green-500 px-5 py-3 font-medium text-white hover:opacity-80'
          onClick={onAccept}
        >
          Accept
        </button>
        <button
          className='min-w-[6rem] rounded-lg bg-red-500 px-5 py-3 font-medium text-white hover:opacity-80'
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CallDialog;
