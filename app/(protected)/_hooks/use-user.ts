"use client";

import { useState, useEffect } from "react";
import { adminCredentials } from "@/lib/data";

const getUser = () => {
  // Check if we're in the browser before using localStorage
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("GamerzAcademyAdmin");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export default function useUser() {
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    // Set the user from localStorage when the component mounts
    setUser(getUser());
  }, []);

  const login = (data: { email: string; password: string }) => {
    const { email, password } = data;
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      // Check if we're in the browser before using localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("GamerzAcademyAdmin", JSON.stringify({ email }));
      }
      setUser({ email });
      return {
        success: true,
        error: null,
      };
    } else {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }
  };

  const logout = () => {
    // Check if we're in the browser before using localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("GamerzAcademyAdmin");
    }
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
}
