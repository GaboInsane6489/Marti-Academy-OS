"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
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

  // Usamos una referencia para evitar fugas de memoria en llamadas asíncronas
  const mounted = useRef(true);

  // Función para cargar perfil centralizada y optimizada
  const loadProfile = useCallback(async (userId) => {
    if (!userId) return;

    try {
      // 1. Intentar recuperación rápida de caché
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`marti_profile_${userId}`);
        if (cached && mounted.current) {
          setProfile(JSON.parse(cached));
        }
      }

      // 2. Fetch de datos reales (incluye XP y nivel)
      const userProfile = await authService.getUserProfile(userId);

      if (userProfile && mounted.current) {
        setProfile(userProfile);

        // 3. Actualizar caché con datos frescos
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `marti_profile_${userId}`,
            JSON.stringify(userProfile),
          );
        }
      }
    } catch (error) {
      console.error("❌ Error en AuthProvider (loadProfile):", error);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;

    // Supabase maneja la sesión inicial automáticamente mediante onAuthStateChange.
    // Al suscribirnos, se dispara el evento 'INITIAL_SESSION' de inmediato.
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      console.log(`🔔 Auth Event: ${event}`);

      try {
        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user.id);
        } else {
          // Limpieza si no hay sesión (Logout o sesión expirada)
          setUser(null);
          setProfile(null);
          if (typeof window !== "undefined") {
            // Limpiamos solo el prefijo del perfil para evitar basura
            Object.keys(localStorage)
              .filter((key) => key.startsWith("marti_profile_"))
              .forEach((key) => localStorage.removeItem(key));
          }
        }
      } catch (error) {
        console.error("❌ Error en onAuthStateChange:", error);
      } finally {
        // Garantizamos que el loading se apague SIEMPRE al final de la lógica
        if (mounted.current) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

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
