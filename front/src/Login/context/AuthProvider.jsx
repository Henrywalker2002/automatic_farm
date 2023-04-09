import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({});
  // const [name, setName] = useState("");
  // const [role, setRole] = useState("");
  const loginInfo = {
    name: "",
    role: "",
  };

  return (
    <AuthContext.Provider value={{ loginInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
