import { createContext, useReducer } from "react";

export const FGoalContext = createContext();
export const goalReducer = (state, action) => {
  switch (action.type) {
    case "SET_FGOAL":
      return { fgoals: action.payload };
    case "CREATE_FGOAL":
      return {
        fgoals: [action.payload, ...state.fgoals],
      };
    case "DELETE_FGOAL":
      return {
        fgoals: state.fgoals.filter((goal) => goal._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const FGoalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, {
    fgoals: null,
  });

  return (
    <FGoalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FGoalContext.Provider>
  );
};
