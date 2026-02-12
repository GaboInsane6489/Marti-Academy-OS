import "./globals.css";

export const metadata = {
  title: "Martí Academy OS",
  description: "Sistema Digital Institucional del Colegio José Martí",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
