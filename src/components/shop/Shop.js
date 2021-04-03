import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import fakedata from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import './shop.css'


const Shop = () => {
   const product10 = fakedata.slice(0,10);
   const [product,setProduct]= useState(product10);
   const[cart,setCart]=useState([]);


   const buttonHandler=(product)=>{
       const toBeAddedKey=product.key;
       
    const sameProduct=cart.find(pd=>pd.key===toBeAddedKey);
    let count=1;
    let newCart;
    if(sameProduct){
        count =sameProduct.quantity+1;
        sameProduct.quantity=count;
        const others = cart.filter(pd=>pd.key!==toBeAddedKey);
        newCart=[...others,sameProduct]
    }
    else{
        product.quantity=1;
        newCart=[...cart,product]
    }
       setCart(newCart);
       addToDatabaseCart(product.key,count);
   }

   useEffect(()=>{
    const savedCarts=getDatabaseCart();
    const productKeys=Object.keys(savedCarts);
    
    const previousCart=productKeys.map(existingKey =>{
        const product = fakeData.find(pd=>pd.key===existingKey);
        product.quantity=savedCarts[existingKey];
        return product;
    });
    
    setCart(previousCart);

},[])
  
    return (
        <div className="shop">
            <div className="product-container">
            {
            product.map(pd=> <Product
                key={pd.key}
                showAddToCart={true}
                handleButtonHandler={buttonHandler}
                product={pd}></Product>)
            }
               
           </div >
           <div className="cart-container">
               <Cart cart={cart} >
               <Link to="/review"><button className="buttons">  review your orders</button></Link>
               </Cart>
               
        

           </div>
        </div>
    );
};

export default Shop;