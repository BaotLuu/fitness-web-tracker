import { createContext, useReducer } from "react";

export const WorkoutPlan1Context = createContext();
export const workoutPlan1Reducer = (state, action) => {
  switch (action.type) {
    case "SET_WP1":
      return {
        workoutplan1: action.payload,
      };
    case "CREATE_WP1":
      return {
        workoutplan1: [action.payload, ...state.workoutplan1],
      };
    case "DELETE_WP1":
      return {
        workoutplan1: state.workoutplan1.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutPlan1ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutPlan1Reducer, {
    workoutplan1: null,
  });

  return (
    <WorkoutPlan1Context.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutPlan1Context.Provider>
  );
};
