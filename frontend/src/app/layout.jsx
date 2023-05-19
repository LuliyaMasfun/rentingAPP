import Navbar2 from "../components/Navbar2";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="grow">
        <Navbar2 />

        {children}
      </body>
    </html>
  );
}
