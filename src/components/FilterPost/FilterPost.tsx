import IconProfile from '../IconProfile';

interface Props {
  username: string;
  description: string;
  likes: number;
  comments: number;
  image?: string;
  date?: string;
  video?: string;
}
export default function FilterPost(props: Props) {
  const { username, description, likes, comments, image, date, video } = props;

  return (
    <div className='mt-5 px-4 pb-4'>
      <div className='flex w-full border-b pb-4'>
        <div className='flex-grow basis-80'>
          <div className='flex items-center gap-4'>
            <IconProfile />
            <span className='text-sm font-medium text-black'>{username}</span>
            <span className='text-xs font-normal text-gray-300'>{date} ago</span>
            <button className='text-xs font-semibold text-blue-500'>Follow</button>
          </div>

          <p className='mt-2 text-sm'>{description}</p>

          <div className='mt-4 flex gap-4'>
            <p className='text-sm text-gray-500'>{likes} likes</p>
            <p className='text-sm text-gray-500'>{comments} comments</p>
          </div>
        </div>

        {/* Images */}
        {image && (
          <div className='flex flex-grow justify-end'>
            <img
              src='/src/assets/images/user.jpg'
              alt=''
              className='h-32 w-56 rounded-md object-cover'
            />
          </div>
        )}

        {video && (
          <div className='flex flex-grow justify-end'>
            <video className='h-32 w-56 rounded-lg' controls>
              <source src={video} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}
