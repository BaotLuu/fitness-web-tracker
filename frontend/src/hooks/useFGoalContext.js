import { FGoalContext } from "../context/FGoalContext";
import { useContext } from "react";

export const useFGoalContext = () => {
  const context = useContext(FGoalContext);

  if (!context) {
    throw Error("useFGoalContext must be used inside a FGoalContextProvider");
  }

  return context;
};
