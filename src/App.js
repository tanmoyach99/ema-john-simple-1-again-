import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>email: { loggedInUser.email}</p>
      <Router>
       <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review" >
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>

          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/">
            <Shop></Shop>
          </Route>
          
         </Switch> 

      </Router>
    
      
    
      
    </UserContext.Provider>
  );
}

export default App;
