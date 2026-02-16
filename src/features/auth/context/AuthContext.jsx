"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión inicial
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          setUser(session.user);
          const userProfile = await authService.getUserProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("Error inicializando auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // 2. Escuchar cambios de estado
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        try {
          const userProfile = await authService.getUserProfile(session.user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error buscando perfil:", error);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    signInWithGoogle: authService.signInWithGoogle,
    signOut: authService.signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
