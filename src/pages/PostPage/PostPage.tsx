import PostItem from 'src/components/PostItem';
import { Post } from 'src/types/post.type';

//fake interface data for me
const post: Post = {
  _id: '657528850ef668fd42ec83fc',
  userId: '657143b70168c301ed23ba18',
  username: 'vpu2.4',
  email: 'levanphu2003248@gmail.com',
  profilePicture:
    'https://res.cloudinary.com/daszajz9a/image/upload/v1701921721/657143b70168c301ed23ba18',
  post: 'Colo taceo clamo officia thalassinus adulescens accusator vereor succedo.',
  imgVersion: '',
  pId: '58079719025552',
  imgId: '',
  videoVersion: '',
  videoId: '',
  feelings: '',
  gifUrl: '',
  privacy: 'public',
  reactions: {
    like: 0
  },
  createdAt: '2023-12-10T02:55:01.762Z'
};
export default function PostPage() {
  return (
    <main className='ml-auto h-screen w-[calc(100%-4.5rem)] overflow-y-scroll lg:w-[calc(100%-14rem)]'>
      <div className='flex w-full justify-center p-5'>
        <PostItem
          post={post}
          className='w-full max-w-[40rem] rounded-lg border shadow'
        />
      </div>
    </main>
  );
}
