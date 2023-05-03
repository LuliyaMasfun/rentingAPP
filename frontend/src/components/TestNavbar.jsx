import Link from "next/link";
import { useState } from "react";
import changersHub from "../../public/changershub.png";
import profileImg from "../../public/profilePic16.png";
import { FaRegBell } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import Image from "next/image";

const TestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About", path: "/about" },
    { id: 3, title: "Services", path: "/services" },
    { id: 4, title: "Contact", path: "/contact" },
  ];

  function handleSideBar() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-dgray p-6">
      <div
        className={`flex w-full items-center md:flex-shrink-0 text-white mr-6 
        `}
      >
        <div className="flex items-center flex-shrink-0 justify-between w-full">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
              onClick={handleSideBar}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <Link className="px-3" href={"/"}>
              <Image src={changersHub} alt={"logo"} />
            </Link>
          </div>

          <div className="flex items-center justify-between ">
            <div className="pr-5">
              <FaRegBell />
            </div>
            <Image src={profileImg} alt={"profileIcon"} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TestNavbar;
