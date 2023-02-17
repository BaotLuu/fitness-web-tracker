import { createContext, useReducer } from "react";

export const JournalContext = createContext();
export const journalReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOURNAL":
      return { journals: action.payload };
    case "CREATE_JOURNAL":
      return {
        journals: [action.payload, ...state.journals],
      };
    case "DELETE_JOURNAL":
      return {
        journals: state.journals.filter(
          (journal) => journal._id !== action.payload._id
        ),
      };
    case "UPDATE_JOURNAL":
      return { journals: [...action.payload] };
    default:
      return state;
  }
};

export const JournalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, {
    journals: null,
  });

  return (
    <JournalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JournalContext.Provider>
  );
};
