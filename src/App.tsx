import useRouteElement from './useRouteElement';
import AuthPage from './layouts/AuthPage';
import Login from './pages/Login';

function App() {
  const routeElement = useRouteElement();
  return <div>{routeElement}</div>;
}

export default App;
