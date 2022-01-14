import { LOAD_FREE_CARS, LOAD_ITEMS_CARS, CHOOSE_FREE_CAR } from "../types";

const initialState = {
  freeCars: [],
  chooseCar: { modal: false, message: "" },
};

export const lessonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FREE_CARS:
      const data = action.payload.data;
      const freeCars = { data: data };

      return {
        ...state,
        freeCars: freeCars,
      };     

    case CHOOSE_FREE_CAR:
      const chooseCar = action.payload.data;
      return {
        ...state,
        chooseCar: chooseCar,
      };

    default:
      return state;
  }
  return state;
};