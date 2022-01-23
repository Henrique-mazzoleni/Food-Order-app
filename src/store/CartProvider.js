import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[itemIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedAmount };
  } else if (action.type === "REMOVE") {
    const toRemoveItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const toRemoveItem = state.items[toRemoveItemIndex];
    const updatedAmount = state.totalAmount - toRemoveItem.price;
    let updatedItems;
    if (toRemoveItem.amount > 1) {
      const updatedItem = {
        ...toRemoveItem,
        amount: toRemoveItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[toRemoveItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items];
      updatedItems = updatedItems.filter((item) => item.id !== toRemoveItem.id);
    }
    return { items: updatedItems, totalAmount: updatedAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContextObject = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextObject}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
