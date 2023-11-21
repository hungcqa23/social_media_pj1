import IconProfile from '../IconProfile';

interface Props {
  toggleModal: () => void;
}
export default function CreatePost({ toggleModal }: Props) {
  return (
    <div className='mb-4 h-40 w-[34rem] max-w-full rounded-md border shadow'>
      <div className='p-4'>
        <div className='flex border-b pb-3'>
          <IconProfile />
          <button className='grow rounded-full bg-gray-100 hover:bg-gray-200' onClick={toggleModal}>
            <div className='py-2 pl-3'>
              <span className='block text-left text-base font-medium text-gray-400'>
                What's on your thought, Hưng ?
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
