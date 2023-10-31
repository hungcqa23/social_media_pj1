import Search from './components/Search/Search';
import MainLayout from './layouts/MainLayout';
import useRouteElement from './useRouteElement';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='overflow-x-hidden'>
      <MainLayout>
        <main className='ml-auto w-[calc(100%-14rem)]'>
          <div className='flex w-full justify-center pt-5'>
            <div>
              <div>Hello 1</div>
              <div className='pl-16'>Hello 2</div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

export default App;
