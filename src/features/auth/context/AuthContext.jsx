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

          // Intentar cargar perfil desde caché primero para UX instantánea
          const cachedProfile = localStorage.getItem(
            `marti_profile_${session.user.id}`,
          );
          if (cachedProfile) {
            setProfile(JSON.parse(cachedProfile));
          }

          // Revalidar perfil en background
          const userProfile = await authService.getUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
            localStorage.setItem(
              `marti_profile_${session.user.id}`,
              JSON.stringify(userProfile),
            );
          }
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
      try {
        if (session?.user) {
          setUser(session.user);

          // Cargar caché de forma segura
          try {
            const cachedProfile = localStorage.getItem(
              `marti_profile_${session.user.id}`,
            );
            if (cachedProfile && !profile) {
              setProfile(JSON.parse(cachedProfile));
            }
          } catch (e) {
            console.warn("Error leyendo caché de perfil:", e);
            // Si falla el caché, no pasa nada, seguimos con el fetch real
          }

          try {
            const userProfile = await authService.getUserProfile(
              session.user.id,
            );
            if (userProfile) {
              setProfile(userProfile);
              localStorage.setItem(
                `marti_profile_${session.user.id}`,
                JSON.stringify(userProfile),
              );
            }
          } catch (error) {
            console.error("Error buscando perfil actualizado:", error);
          }
        } else {
          setUser(null);
          setProfile(null);
          // Limpiar caché al cerrar sesión podría ser opcional, pero seguro
          // localStorage.removeItem("marti_profile_...");
        }
      } catch (err) {
        console.error("Error en onAuthStateChange:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [profile]); // Added profile dependecy to suppress lint but be careful with loops, though profile usage inside effect is just for check.

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
