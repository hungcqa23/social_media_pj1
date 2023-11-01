interface Props {
  toggleModal: () => void;
}
export default function Modal({ toggleModal }: Props) {
  return (
    <div className='fixed inset-0 h-screen w-screen'>
      <div className='relative h-full w-full'>
        <div className='absolute inset-0 bg-slate-100 opacity-80' onClick={toggleModal}></div>
        <div className='absolute left-1/2 top-1/2 mx-auto h-[30rem] w-[29rem] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow'>
          <div className='relative flex items-center justify-center border-b p-5'>
            <div className='text-xl font-bold text-black'>Create post</div>
            <button
              className='absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200'
              onClick={toggleModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
                className='h-6 fill-gray-500'
              >
                <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
