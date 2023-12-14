import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postApi } from 'src/apis/post.api';
import PostItem from 'src/components/PostItem';
import { Post } from 'src/types/post.type';
import NotFound from '../NotFound';
import Spinner from 'src/components/Spinner';

export default function PostPage() {
  const { postId } = useParams<{
    postId?: string;
  }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => postApi.getPostById(postId as string)
  });

  const post = data?.data.post as Post;

  return (
    <main className='ml-auto h-screen w-[calc(100%-4.5rem)] overflow-y-scroll lg:w-[calc(100%-14rem)]'>
      <div className='flex w-full justify-center p-5'>
        {isError && <NotFound />}
        {isLoading && <Spinner />}
        {!isLoading && <PostItem post={post} />}
      </div>
    </main>
  );
}
