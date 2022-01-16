import { Fragment, useState } from "react";

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
    <Fragment>
      {isShowingCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
