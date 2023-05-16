import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavItems } from "./NavItems";
import SearchIcon from "@mui/icons-material/Search";
import { TextFields } from "@mui/icons-material";
import { NavItems2 } from "./NavItems2";

const Sidebar = ({ isOpen, onDataChange }) => {
  const [query, setQuery] = useState("");
  return (
    <div className="relative">
      {isOpen && (
        <>
          <button
            onClick={() => onDataChange(isOpen)}
            className="fixed top-0 right-0 p-2 text-gray-800 bg-gray-200 rounded-full"
          >
            {isOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
          </button>

          {/* <div className="text-white items-center justify-start">
            <p
              className="text-white
            "
            >
              Menu
            </p>
          </div> */}

          <div
            className={`md:block md:w-64 bg-gray-800 h-screen fixed sm:bg-red-500 md:bg-neutral-700 top-0 right-0 z-40 transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-center mt-10">
              <div className="flex items-center justify-center bg-transparent border-none active:border-none rounded-md shadow-black hover:cursor-pointer min-w-max">
                <SearchIcon />
                <input
                  type="   search"
                  className="rounded-md bg-transparent shadow-sm shadow-black border-none text-white focus:border-none pl-2 active:border-none "
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-start pl-10 h-16 text-white font-bold text-xl mt-10">
              Menu
            </div>
            <div className="p-4">
              <ul className="flex flex-col items-center justify-center">
                {NavItems.map((item, key) => (
                  <li
                    key={key}
                    onClick={() => (window.location.pathname = item.path)}
                    className="flex w-full my-5 hover:bg-slate-300 cursor-pointer hover:rounded-md"
                  >
                    <div className="pr-5">{item.icon}</div>{" "}
                    <p className="pl=5">{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4">
              <ul className="flex flex-col items-center justify-center">
                {NavItems2.map((item, key) => (
                  <li
                    key={key}
                    onClick={() => (window.location.pathname = item.path)}
                    className="flex w-full my-5 hover:bg-slate-300 cursor-pointer hover:rounded-md"
                  >
                    <div className="pr-5 min-w-max">{item.icon}</div>{" "}
                    <p className="pl=5">{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={`${
              isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
            } fixed inset-0 bg-black z-30 transition-opacity duration-300 ease-in-out`}
            // onClick={handleToggle}
          ></div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
