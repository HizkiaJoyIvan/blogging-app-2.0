import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const res = await axios.post(
      `${process.env.REACT_APP_URI}/auth/login`,
      input
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${process.env.REACT_APP_URI}/auth/logout`,{
      token: currentUser?.refreshToken
    });
    setCurrentUser(null);
  };

  const refresh = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/auth/refresh`, {
        token: currentUser?.refreshToken,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }));
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
