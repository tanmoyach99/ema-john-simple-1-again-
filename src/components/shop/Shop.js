import React, { useState } from 'react';
import fakedata from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import './shop.css'


const Shop = () => {
   const product10 = fakedata.slice(0,10);
   const [product,setProduct]= useState(product10);

   const[cart,setCart]=useState([]);


   const buttonHandler=(product)=>{
       const newCart=[...cart,product];
       setCart(newCart);
   }
  
    return (
        <div className="shop">
            <div className="product-container">
            {
            product.map(pd=> <Product
                handleButtonHandler={buttonHandler}
                product={pd}></Product>)
            }
               
           </div >
           <div className="cart-container">
               <Cart cart={cart} ></Cart>
               
        

           </div>
        </div>
    );
};

export default Shop;