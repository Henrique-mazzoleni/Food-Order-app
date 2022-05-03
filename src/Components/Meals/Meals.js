import { Fragment, useEffect, useCallback, useState } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

/*const DUMMY_MEALS = [
    {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
]; */

const FIREBASE_URL = "https://food-app-api-database-default-rtdb.europe-west1.firebasedatabase.app/meals.json"

const Meals = () => {
  const  [meals, setMeals] = useState([])
  
  const fetchHandler = useCallback(async () => {
    const response = await fetch(FIREBASE_URL)
    const data = await response.json()

    let loadedMeals = []
    
    for (const key in data) {
      loadedMeals.push({
        id: key,
        ...data[key]
      })
    }
    
    setMeals(loadedMeals)
  },[])
  
  useEffect(() => {
    fetchHandler()
  },[fetchHandler])

  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals mealsList={meals} />
    </Fragment>
  );
};

export default Meals;
