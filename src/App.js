import { useState } from "react";

import CartProvider from "./store/CartProvider";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  const [isShowingCart, setIsShowingCart] = useState(false);

  const showCartHandler = () => {
    setIsShowingCart(true);
  };

  const hideCartHandler = () => {
    setIsShowingCart(false);
  };

  return (
    <CartProvider>
      {isShowingCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
