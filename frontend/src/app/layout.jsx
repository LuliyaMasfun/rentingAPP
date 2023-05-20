import Navbar2 from "../components/Navbar2";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <div className="flex-col min-h-screen">
      <html lang="en">
        <Navbar2 />

        <body className="grow h-screen w-screen">{children}</body>
      </html>
    </div>
  );
}
