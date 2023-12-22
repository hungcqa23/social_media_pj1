export default function NotFound({
  className = 'grid h-screen place-content-center bg-white px-4'
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className='uppercase tracking-widest text-gray-500'>
        404 | Not Found
      </h1>
    </div>
  );
}
