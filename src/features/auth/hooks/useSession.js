"use client";

import { useAuth } from "../context/AuthContext";

/**
 * Hook personalizado para simplificar el acceso a Auth en componentes
 */
export const useSession = () => {
  const { user, profile, loading, signInWithGoogle, signOut } = useAuth();

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === "admin",
    isTeacher: profile?.role === "docente",
    isStudent: profile?.role === "estudiante",
    signInWithGoogle,
    signOut,
  };
};
