import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ProductReviews from "../ProductReviews/ProductReviews";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

  const handleProceedCheckOut = () => {
    setCart([]);
    setOrderPlaced(true);
      processOrder();
      history.push('/shipment')
  };

  const removeProduct = (productKey) => {
    // console.log('remove clicked',productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCarts = getDatabaseCart();
    const productKeys = Object.keys(savedCarts);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCarts[key];
      return product;
    });

    setCart(cartProducts);
  }, []);

  const thankYouImage = <img src={happyImage} alt="" />;

  return (
    <div className="shop">
      <div className="product-container">
        {cart.map((pd) => (
          <ProductReviews
            key={pd.key}
            removeProduct={removeProduct}
            products={pd}
          ></ProductReviews>
        ))}
        {orderPlaced && thankYouImage}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="buttons">
            Proceed checkOut
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
