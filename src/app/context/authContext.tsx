"use client";
import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);

// Define the shape of the auth context data
interface AuthContextType {
  user: User | null;
}

// Create the context with the default value
export const AuthContext = React.createContext<AuthContextType>({
  user: null, // default value for user
});

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
