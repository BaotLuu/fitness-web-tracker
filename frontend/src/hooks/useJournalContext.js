import { JournalContext } from "../context/JournalContext";
import { useContext } from "react";

export const useJournalContext = () => {
  const context = useContext(JournalContext);

  return context;
};
