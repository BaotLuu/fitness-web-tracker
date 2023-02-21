import { FGoalContext } from "../context/FGoalContext";
import { useContext } from "react";

export const useFGoalContext = () => {
  const context = useContext(FGoalContext);

  return context;
};
