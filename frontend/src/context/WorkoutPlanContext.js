import { createContext, useReducer } from "react";

export const WorkoutPlanContext = createContext();
export const workoutPlanReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTPS":
      return {
        workoutplan: action.payload,
      };
    case "CREATE_WORKOUTPLAN":
      return {
        workoutplan: [action.payload, ...state.workoutplan],
      };
    case "DELETE_WORKOUTPS":
      return {
        workoutplan: state.workoutplan.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutPlanContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutPlanReducer, {
    workoutplan: null,
  });

  return (
    <WorkoutPlanContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutPlanContext.Provider>
  );
};
