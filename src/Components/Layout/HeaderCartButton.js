import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";
import { useContext, useState, useEffect } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  const [btnIsActive, setBtnIsActive] = useState(false);

  const itemsAmount = items.reduce((cur, item) => cur + item.amount, 0);

  const btnClasses = `${classes.button} ${btnIsActive && classes.bump}`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsActive(true);

    const timer = setTimeout(() => {
      setBtnIsActive(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
