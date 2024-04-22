import { createContext, useContext, useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
