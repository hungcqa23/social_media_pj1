import Profile from '../Profile';

interface Props {
  toggleModal: () => void;
}
export default function CreatePost({ toggleModal }: Props) {
  return (
    <div className='h-40 w-[32rem] max-w-full rounded-md shadow'>
      <div className='p-4'>
        <div className='flex border-b pb-3'>
          <div className='mr-2'>
            <Profile />
          </div>
          <button className='grow rounded-full bg-gray-100 hover:bg-gray-200' onClick={toggleModal}>
            <div className='py-2 pl-3'>
              <span className='block text-left text-base font-medium text-gray-400'>
                What's on your thought, Hưng đẹp trai ?
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
