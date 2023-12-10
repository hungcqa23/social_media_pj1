import { ToastContainer } from 'react-toastify';
import useRouteElement from './useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { socketIOService } from './socket/socket';

function App() {
  const routeElement = useRouteElement();

  useEffect(() => {
    socketIOService.setUpConnection();
  }, []);

  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      {routeElement}
      <ToastContainer />
    </div>
  );
}

export default App;
