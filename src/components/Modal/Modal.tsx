import classNames from 'classnames';

interface Props {
  header?: string;
  onCloseModal?: () => void;
  children: React.ReactNode;
  classNameModal?: string;
  type?: 'default' | 'option';
}
export default function Modal({
  header,
  onCloseModal,
  children,
  type = 'default',
  classNameModal = 'flex min-h-[24rem] md:w-[26rem] w-96 flex-col justify-between rounded-xl bg-white shadow'
}: Props) {
  if (type === 'option') {
    return (
      <div className='text-normal flex min-h-[2rem] w-80 flex-col  rounded-lg bg-white text-base font-normal text-black md:w-96'>
        {children}
        <button
          onClick={onCloseModal}
          className={classNames('text-normal p-3 font-normal', {
            'border-t border-gray-300': children
          })}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={classNameModal}>
      <header className='relative flex h-14 items-center justify-center border-b p-5'>
        <div className='text-md font-medium text-black'>{header}</div>

        <button
          className='top-[calc((100% - 2.25rem) / 2)] absolute right-3 flex h-9 w-9 items-center justify-center'
          type='button'
          onClick={onCloseModal}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 384 512'
            className='h-6 fill-black'
          >
            <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
          </svg>
        </button>
      </header>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
