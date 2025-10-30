import "../styles/globals.css";

export const metadata = {
  title: "NovaForge — AI Builder",
  description: "Multilingual AI builder with auto publish"
};

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  )
}
