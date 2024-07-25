import { createContext, useContext, useReducer } from "react";

const AuthenticationContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action type");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthenticationProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined)
    throw new Error(
      "AuthenticationContext was used outside AuthenticationProvider"
    );
  return context;
};

export { AuthenticationProvider, useAuthentication };
