import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        username,
        password,
      });

      console.log("REAL LOGIN RESPONSE 👉", res.data);

      // ✅ correct path
      const jwt = res.data.token.token;
      const user = res.data.token.user;

      localStorage.setItem("token", jwt);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful!");
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

 const signup = async (payload) => {
  setLoading(true);
  try {
    const res = await axiosInstance.post(API_PATH.AUTH.REGISTER, payload);

    console.log("SIGNUP RESPONSE 👉", res.data);

    toast.success("Account created successfully!");

    // ❌ DO NOT store token or user here
    return res.data.user;

  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    setLoading(false);
  }
};

  return { login, signup, loading };
};
