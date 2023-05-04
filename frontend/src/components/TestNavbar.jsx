import Link from "next/link";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { useState } from "react";
import changersHub from "../../public/changershub.png";
import profileImg from "../../public/profilePic16.png";
import Sidebar from "./Sidebar";

const TestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDataChange = (isOpen) => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center bg-dgray p-6">
      <div className="flex w-full items-center flex-shrink-0 text-white">
        <div className="flex items-center flex-shrink-0 justify-between w-full">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
              onClick={() => setIsOpen(!isOpen)}
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

          <div className="flex items-center justify-between">
            <div className="pr-10">
              <FaRegBell height={100} width={100} />
            </div>
            <Image src={profileImg} alt={"profileIcon"} />
          </div>
          <Sidebar onDataChange={handleDataChange} isOpen={isOpen} />
        </div>
      </div>
    </nav>
  );
};
export default TestNavbar;
