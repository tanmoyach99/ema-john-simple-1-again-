import React from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
   
    const {img,name,price,stock,seller}=props.product;
    return (
        <div className="products">
            <div className="image-container">
                <img src={img} alt=""/>

            </div>
            <div className="details">
                <h5>{name}</h5>
                <p>price: $  {price}</p>
                <br/>
                <p>By: {seller}</p>
                <br/>
                <p>only {stock} products left in stock</p>
                <button onClick={()=>{props.handleButtonHandler(props.product)}} className="buttons"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;