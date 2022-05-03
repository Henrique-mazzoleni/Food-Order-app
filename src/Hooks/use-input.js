import { useState } from 'react';

const useInput = (validationFunction) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  let isValid = validationFunction(value);
  let hasError = !isValid && touched;

  const inputHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setTouched(true);
  };

  return {
      value,
      isValid,
      setTouched,
      hasError,
      inputHandler,
      blurHandler,
  }
};

export default useInput;
