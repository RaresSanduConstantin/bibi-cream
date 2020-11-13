import React from "react";

const CartDropDown = () => {
  return (
    <div>
      <div className="cart-dropdown">
        <div className="cart-items">
          <span className="empty-message">
            <div className="empty-cart"></div>
            Your Cart is Empty
          </span>
        </div>
        <button
          onClick={() => {
            console.log(123);
            // dispatch(toggleCartHidden());
          }}
        >
          Go To Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDropDown;
