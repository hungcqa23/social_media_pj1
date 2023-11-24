import IconProfile from 'src/components/IconProfile';

export default function BlockedAccount() {
  return (
    <>
      <div className='px-4'>
        <h1 className='mt-6 text-4xl font-extralight'>Blocked accounts</h1>
        <p className='mt-6 font-normal text-gray-400'>
          You can block people anytime from their profiles
        </p>
      </div>

      <div className='ml-4 mr-10 mt-10'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-grow items-center'>
            <IconProfile isImage className='h-14 w-14' classNameImage='h-14 w-14' />
            <div className='ml-3 flex flex-col'>
              <span className='text-sm font-medium text-black'>An Hung Windyy</span>
              <span className='text-sm font-normal text-gray-300'>An Hung</span>
            </div>
          </div>
          <button className='-ml-6 min-h-[2rem] rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold text-black'>
            Unblock
          </button>
        </div>
      </div>
    </>
  );
}
