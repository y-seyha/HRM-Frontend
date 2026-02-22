import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useAuth as useAuthHook } from "../hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const { login, signup, loading } = useAuthHook();
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        const saved = localStorage.getItem("user");

        if (saved && saved !== "undefined") {
          setUser(JSON.parse(saved));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid user in localStorage:", error);
        localStorage.removeItem("user");
        setUser(null);
      }

      setAuthLoaded(true);
    }, 0);
  }, []);
  const loginUser = async (username, password) => {
    const loggedInUser = await login(username, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signupUser = async (payload) => {
    return await signup(payload);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, signupUser, logoutUser, loading, authLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
