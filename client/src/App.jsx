import { BrowserRouter as Router } from 'react-router-dom';

import { ShopProvider } from "./contexts/ShopContext.jsx";
import AppRoutes from './routes/AppRoutes';


function App() {

  return (
    <ShopProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ShopProvider>
  )
}

export default App;