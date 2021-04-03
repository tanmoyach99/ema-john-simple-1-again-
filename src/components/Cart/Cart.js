import React from 'react';


const Cart = (props) => {
    const cart=props.cart;
    const total=cart.reduce((total,prd)=>total+prd.price*prd.quantity,0);
    let shippingCost=0;
    if(total<15){
        shippingCost=5;
    }
    else if(total<35) {
        shippingCost=0;
    }
    
    const tax=(total*.1).toFixed(2);
    const grandTotal= (total+Number(tax)+shippingCost).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <br/>
            <p>Items Ordered: {cart.length}</p> 
            <p>total cost: {total}</p>
            <p>shipping: {shippingCost}</p>
            <h5>grand Total: {grandTotal}</h5>
            <br/>
            {props.children}
            

        </div>
    );
};

export default Cart;