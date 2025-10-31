import "./globals.css";

export const metadata = {
  title: "NovaForge Studio",
  description: "Build something — Lovable style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
