import useRouteElement from './useRouteElement';

function App() {
  const routeElement = useRouteElement();
  return <div className='overflow-x-hidden'>{routeElement}</div>;
}

export default App;
