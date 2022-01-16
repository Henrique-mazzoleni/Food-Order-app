import { Fragment } from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
        <Cart />
      </main>
    </Fragment>
  );
}

export default App;
