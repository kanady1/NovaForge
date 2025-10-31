// app/layout.js
import './globals.css';

export const metadata = {
  title: 'NovaForge Studio',
  description: 'AI Builder (Lovable-style) by Kanady',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
