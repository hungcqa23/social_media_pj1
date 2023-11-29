import CreatePost from 'src/components/CreatePost';
import PostsList from 'src/components/PostsList';
import SuggestedBar from 'src/components/SuggestedBar';

export default function Main() {
  return (
    <>
      <main className='ml-auto w-[calc(100%-4.5rem)] lg:w-[calc(100%-14rem)]'>
        <div className='flex w-full justify-center pt-5'>
          <div className='w-full max-w-[40rem]'>
            <div className='mt-9 flex flex-col items-center'>
              <CreatePost />
              <PostsList />
            </div>
          </div>

          <SuggestedBar />
        </div>
      </main>
    </>
  );
}
