import React, { useState } from "react";

import useInput from "../../Hooks/use-input";

import styles from "./Order.module.css";

const Order = (props) => {
  const notEmptyValidation = (value) => value.trim().length !== 0;

  const {
    value: name,
    isValid: nameIsValid,
    setTouched: setNameTouched,
    hasError: nameHasError,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
  } = useInput(notEmptyValidation);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    setTouched: setLastNameTouched,
    hasError: lastNameHasError,
    inputHandler: lastNameInputHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(notEmptyValidation);

  const {
    value: address,
    isValid: addressIsValid,
    setTouched: setAddressTouched,
    hasError: addressHasError,
    inputHandler: addressInputHandler,
    blurHandler: addressBlurHandler,
  } = useInput(notEmptyValidation);

  const {
    value: email,
    isValid: emailIsValid,
    setTouched: setEmailTouched,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: phone,
    inputHandler: phoneInputHandler,
  } = useInput(() => true);

  const [payment, setPayment] = useState("card");

  const paymentInputHandler = (event) => {
      setPayment(event.target.value)
  }

  let nameClasses = `${styles.name} ${styles["form-field"]}`;
  let lastNameClasses = `${styles.name} ${styles["form-field"]}`;
  let addressClasses = `${styles.name} ${styles["form-field"]}`;
  let emailClasses = `${styles.name} ${styles["form-field"]}`;

  if (nameHasError) nameClasses += ` ${styles.invalid}`;
  if (lastNameHasError) lastNameClasses += ` ${styles.invalid}`;
  if (addressHasError) addressClasses += ` ${styles.invalid}`;
  if (emailHasError) emailClasses += ` ${styles.invalid}`;

  const formIsValid =
    nameIsValid && lastNameIsValid && addressIsValid && emailIsValid;

  const formData = {
    name,
    lastName,
    address,
    email,
    phone,
    payment,
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      if (!nameIsValid) setNameTouched(true);
      if (!lastNameIsValid) setLastNameTouched(true);
      if (!addressIsValid) setAddressTouched(true);
      if (!emailIsValid) setEmailTouched(true);
      return;
    }

    props.onSubmit(formData);
  };

  const abortHandler = () => {
    props.onAbort();
  };

  return (
    <form className={styles["order-form"]} onSubmit={submitHandler}>
      <h2>Kontact Info</h2>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Max"
          value={name}
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameHasError && (
        <p className={styles["error-message"]}>Required Field!</p>
      )}
      <div className={lastNameClasses}>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Musterman"
          value={lastName}
          onChange={lastNameInputHandler}
          onBlur={lastNameBlurHandler}
        />
      </div>
      {lastNameHasError && (
        <p className={styles["error-message"]}>Required Field!</p>
      )}
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Street Name, House Nr., Zip, City"
          value={address}
          onChange={addressInputHandler}
          onBlur={addressBlurHandler}
        />
      </div>
      {addressHasError && (
        <p className={styles["error-message"]}>Required Field!</p>
      )}
      <div className={emailClasses}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Max.mustermann@email.de"
          value={email}
          onChange={emailInputHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailHasError && (
        <p className={styles["error-message"]}>Please enter a valid email!</p>
      )}
      <div className={`${styles.phone} ${styles["form-field"]}`}>
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          pattern="([0-9]{3})[0-9]{4}-[0-9]{4}"
          placeholder="(XXX)-XXXX-XXXX"
          value={phone}
          onChange={phoneInputHandler}
        />
      </div>
      <div className={`${styles.payment} ${styles["form-field"]}`}>
        <label htmlFor="payment">Choose a payment method</label>
        <select id="payment" onChange={paymentInputHandler}>
          <option value="card">Credit Card</option>
          <option value="cash">Cash</option>
        </select>
      </div>
      <div className={styles.actions}>
        <button className={styles["button__alt"]} onClick={abortHandler}>
          Abort
        </button>
        <button className={styles.button} type="submit">
          Order
        </button>
      </div>
    </form>
  );
};

export default Order;
