import { createContext, useContext, useEffect, useState } from "react";
import { DUMMY_USERS } from "../config/dummy-users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Logic to handle "Persistence" for new registered users
  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem("app_users");
    return savedUsers ? JSON.parse(savedUsers) : DUMMY_USERS;
  });

  const allArtisans = allUsers.filter((art) => art.role === "artisan");

  // Sync users to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("app_users", JSON.stringify(allUsers));
  }, [allUsers]);

  // Load active session on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- NEW: Register Function ---
  const register = (userData) => {
    // 1. Create a new user object with defaults
    const newUser = {
      ...userData,
      id: `${userData.role === "artisan" ? "art" : "cust"}_${Date.now()}`,
      joinDate: new Date().toISOString().split("T")[0],
      totalJobsPosted: 0,
      isVerified: false,
      rating: 5.0,
      reviewCount: 0,
    };

    // 2. Add to our local "database"
    setAllUsers((prev) => [...prev, newUser]);

    // 3. Automatically log them in
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    return newUser;
  };

  const updateProfile = (updatedData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));

      // Also update them in the allUsers list
      setAllUsers((prev) =>
        prev.map((u) => (u.id === newUser.id ? newUser : u)),
      );

      return newUser;
    });
  };

  const login = (userId) => {
    const foundUser = allUsers.find((u) => u.id === userId);
    if (!foundUser) return;

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        allArtisans,
        allUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
