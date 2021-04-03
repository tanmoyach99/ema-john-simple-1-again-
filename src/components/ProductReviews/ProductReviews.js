import React from 'react';

const ProductReviews = (props) => {
    const{name,quantity,key,price} = props.products;
    const productStyle={borderBottom: '1px solid lightgray',paddingBottom: '10px', marginLeft: '200px'}
    return (
        <div style={productStyle} className="deatils">
            <h2>{name}</h2>
            <p>quantity : {quantity}</p>
            <p>price: $ {price}</p>
            <button
              className="buttons" 
              onClick={()=>props.removeProduct(key)}
            >Remove Item</button>
        </div>
    );
};

export default ProductReviews;