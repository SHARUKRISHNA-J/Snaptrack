import { createContext, useState } from "react";

export const AuthContext = createContext({
  username: "",
  setUsername: (name: string) => {},
});

export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;   // ✅ REQUIRED
