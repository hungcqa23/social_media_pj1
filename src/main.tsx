import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Nav';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <App /> */}
    <Navigation />
  </BrowserRouter>
);
