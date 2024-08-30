import React, { useState } from "react";

interface AuthContextProps {
  loggedInUser: any;
  setLoggedInUser: (user: any) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  loggedInUser: null,
  setLoggedInUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser, setLoggedInUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;