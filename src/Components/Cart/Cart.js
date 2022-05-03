import { useContext, Fragment, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Order from "./Order";

import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";

const FIREBASE_URL = "https://food-app-api-database-default-rtdb.europe-west1.firebasedatabase.app/orders.json"

const Cart = (props) => {
  const [readyToOrder, setReadyToOrder] = useState(false)

  const [orderSuccessful, setOrderSuccessful] = useState(false)
  const [message, setMessage] = useState('Your is being processed. This may take a moment.')

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const itemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderSetupHandler = () => {
    setReadyToOrder(true)
  }

  const dispatchOrderHandler = async (orderUserData) => {
    const dispatchData = {...orderUserData, ...cartCtx.items}
    
    try {
      const response = await fetch(FIREBASE_URL, {
        method: 'POST',
        body: JSON.stringify(dispatchData)
      })
      const data = await response.json()
      console.log(data);
      setMessage('Your order has been successfully submited.')
      setOrderSuccessful(true)
      cartCtx.resetCart();
    } catch {
      setMessage('There was a problem with the order. Please try again.')
    } finally {
      setReadyToOrder(false)
    }
  }

  const cancelOrderHandler = () => {
    setReadyToOrder(false)
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={itemRemoveHandler.bind(null, item.id)}
      onAdd={itemAddHandler.bind(null, item)}
    />
  ));

  const Cart = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button onClick={orderSetupHandler} className={classes.button}>Order</button>}
      </div>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>
    {!readyToOrder && !orderSuccessful && Cart}
    {readyToOrder && <Order onSubmit={dispatchOrderHandler} onAbort={cancelOrderHandler} />}
    {orderSuccessful && <Fragment>
      <h2>{message}</h2>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Close</button>
      </div>
      </Fragment>}
    </Modal>;
};

export default Cart;
