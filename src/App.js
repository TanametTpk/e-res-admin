import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import BusinessPage from './pages/Business';
import ProductPage from './pages/Product';
import ZonePage from './pages/Zone';
import OrderPage from './pages/Order';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/business/:businessId" exact component={BusinessPage} />
      <Route path="/business/:businessId/products" exact component={ProductPage} />
      <Route path="/business/:businessId/zones" exact component={ZonePage} />
      <Route path="/business/:businessId/orders" exact component={OrderPage} />
      <Route path="/notfound" exact component={NotFound} />
    </Router>
  );
}

export default App;
