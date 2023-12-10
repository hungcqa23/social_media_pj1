import { useInfiniteQuery } from '@tanstack/react-query';
import { GetAllPosts, postApi } from 'src/apis/post.api';
import CreatePost from 'src/components/CreatePost';
import List from 'src/components/List';
import PostItem from 'src/components/PostItem';
import SuggestedBar from 'src/components/SuggestedBar';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Main() {
  const { ref, inView } = useInView({
    threshold: 0.75
  });

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => postApi.getAllPosts({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (
        lastPage: GetAllPosts,
        allPages: GetAllPosts[],
        lastPageParam: number
      ) => {
        console.log(lastPage);
        // Total length of allPages
        const totalPages = allPages.reduce(
          (acc, page) => acc + page.posts.length,
          0
        );
        const nextPage =
          totalPages < lastPage.totalPosts ? lastPageParam + 1 : undefined;
        return nextPage;
      }
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <main className='ml-auto h-screen w-[calc(100%-4.5rem)] overflow-y-scroll lg:w-[calc(100%-14rem)]'>
        <div className='flex w-full justify-center pt-5'>
          <div className='w-full max-w-[40rem]'>
            <div className='mt-9 flex flex-col items-center'>
              <CreatePost />

              {isLoading && (
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline h-10 w-10 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                </div>
              )}

              {/* Posts */}
              <div className='flex w-[34rem] max-w-full flex-col gap-3 pb-2'>
                {data?.pages?.map((page, index) => (
                  <List
                    listItems={page?.posts || []}
                    mapFn={(post, index) => {
                      if (page?.posts?.length === index + 1) {
                        return (
                          <PostItem key={post._id} post={post} innerRef={ref} />
                        );
                      }
                      return <PostItem key={post._id} post={post} />;
                    }}
                    className='flex w-[34rem] max-w-full flex-col gap-3 pb-2'
                    key={index}
                  />
                ))}
              </div>

              {isFetchingNextPage && hasNextPage && (
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline h-10 w-10 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                </div>
              )}

              {!hasNextPage && !isLoading && (
                <section className='mb-10 flex flex-col items-center'>
                  <h1 className='my-4 text-2xl font-normal'>
                    You&apos;re All Caught Up
                  </h1>
                  <button
                    className='font-medium text-blue-500'
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    View older posts
                  </button>
                </section>
              )}
            </div>
          </div>

          <SuggestedBar />
        </div>
      </main>
    </>
  );
}
