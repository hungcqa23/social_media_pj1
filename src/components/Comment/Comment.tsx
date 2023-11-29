import IconProfile from '../IconProfile';

interface Props {
  content: string;
  username: string;
}
export default function Comment({ content, username = 'An Hung' }: Props) {
  return (
    <div className='px-4 py-2'>
      <div className='flex gap-2'>
        <IconProfile
          className='h-8 w-8 flex-shrink-0'
          classNameImage='h-8 w-8'
        />
        <div className='flex max-w-fit flex-grow flex-col overflow-y-hidden rounded-2xl bg-gray-100 p-2 text-sm'>
          <span className='mb-1 w-fit text-xs font-semibold'>{username}</span>
          <p className='max-w-fit whitespace-pre-wrap text-sm font-light text-gray-700'>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
