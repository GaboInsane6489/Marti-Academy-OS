"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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

  // Función para cargar perfil centralizada
  const loadProfile = useCallback(async (userId) => {
    try {
      // 1. Intentar caché (solo en cliente)
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`marti_profile_${userId}`);
        if (cached) setProfile(JSON.parse(cached));
      }

      // 2. Fetch real
      const userProfile = await authService.getUserProfile(userId);
      if (userProfile) {
        setProfile(userProfile);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `marti_profile_${userId}`,
            JSON.stringify(userProfile),
          );
        }
      }
    } catch (error) {
      console.error("Error cargando perfil:", error.message || error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            await loadProfile(session.user.id);
          }
        }
      } catch (error) {
        // Aquí verás el error real
        console.error("Error inicializando auth:", error.message || error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]); // Dependencia estable

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
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
