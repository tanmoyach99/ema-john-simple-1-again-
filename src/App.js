import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';



function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review" >
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/">
            <Shop></Shop>
          </Route>
          
         </Switch> 

      </Router>
    
      
    
      
    </div>
  );
}

export default App;
