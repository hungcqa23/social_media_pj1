import React from 'react';

interface Props {
  closeModal: () => void;
}
function Header({ closeModal }: Props) {
  console.log('Re render');
  return (
    <header className='relative flex h-14 items-center justify-center border-b p-5'>
      <div className='text-xl font-bold text-black'>Create Post</div>

      <button
        className='top-[calc((100% - 2.25rem) / 2)] absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200'
        type='button'
        onClick={closeModal}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 384 512'
          className='h-6 fill-gray-500'
        >
          <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
        </svg>
      </button>
    </header>
  );
}
function equal(prevProps: Props, nextProps: Props) {
  return prevProps.closeModal.toString() === nextProps.closeModal.toString();
}

export default React.memo(Header, equal);
