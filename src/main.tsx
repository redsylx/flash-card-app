import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/600.css';

import '@fontsource/poppins/100-italic.css';
import '@fontsource/poppins/300-italic.css';
import '@fontsource/poppins/600-italic.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="custom-app">
      <App/>
  </div>
)
