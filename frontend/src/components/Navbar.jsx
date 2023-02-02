import React from "react";
import changers from "../../public/changershub.png";
import dropdown from "../../public/dropdown.png";
import Image from "next/image";
import notis from "../../public/FaRegBell.png";
import profile from "../../public/profilePic16.png"
const Navbar = () => {
    return (
        <div>

            <nav className="navbar-wrapper flex flex-row w-full h-50 mx-auto">

                <div className="flex-row w-full px-10 py-10 justify-between mx-auto inline-flex">
                    <div className="flex flex-row pl-5 w-1/2 mr-16">
                        <Image alt="drop down logga" src={dropdown} width={100} height={100} className />
                        <Image alt="Changers logga" src={changers} width={200} height={200} className="mx-10" />
                    </div>

                    <div className="flex flex-row w-1/2 pr-5 justify-end mx-auto">
                        <Image alt="notis logga" src={notis} width={100} height={100} className="flex mx-10" />
                        <Image alt="profil bild" src={profile} width={100} height={100} className="flex mx-10" />

                    </div>

                </div>
            </nav>
        </div>
    )
};

export default Navbar;
