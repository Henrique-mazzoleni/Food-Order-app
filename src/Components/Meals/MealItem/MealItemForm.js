import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const inputAmount = amountInputRef.current.value;
    const inputAmountNumber = +inputAmount;

    if (
      inputAmount.lenght === 0 ||
      inputAmountNumber < 1 ||
      inputAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    return props.addToCart(inputAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount. (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
