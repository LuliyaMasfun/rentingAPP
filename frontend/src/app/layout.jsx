import Navbar2 from "../components/Navbar2";
import Provider from "../components/Provider";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        {/* <Navbar2 /> */}
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
