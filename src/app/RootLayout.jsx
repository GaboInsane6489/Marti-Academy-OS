import { AuthProvider } from "@/features/auth/context/AuthContext";
import "../styles/globals.css";

export const metadata = {
  title: "Martí Academy OS",
  description: "Sistema Digital Institucional del Colegio José Martí",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-blue-500/30">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
