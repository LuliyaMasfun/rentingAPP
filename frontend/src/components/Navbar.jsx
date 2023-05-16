import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import profileImg from "../../public/profilePic16.png";
import { IoFilter } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import changersHub from "../../public/changershub.png";
import Link from "next/link";
import Menu1 from "./Menu";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 3vh;
  margin-bottom: 5vh;
  background-color: #1e1e1e;
  height:100px
  max-height: 100%;
  width: 100%;
`;
const HamburgerIcon = styled(IoFilter)`
  /* position: absolute; */
  width: 24px;
  height: 24px;
  left: 0;
  margin-left: 4vh;
  color: #ffffff;
`;
const CompanyLogo = styled(Image)`
  /* position: absolute; */
  margin-left: 9vh;
  margin-top: -1.5vh;
  left: 0;
`;
const NotificationIcon = styled(FaRegBell)`
  /* position: absolute; */
  margin-left: 24vh;
  width: 24px;
  height: 24px;
  color: #ffffff;
`;
const ProfileImg = styled(Image)`
  /* position: absolute; */
  margin-left: 35vh;
`;
const Menu = styled(Menu1)`
  position: fixed;

  transition: transform 0.3s ease - out;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "100%")});
`;

const div1 = styled.div`
  display: flex;
  position: relative;
  padding: 2px 10px;
`;
const div2 = styled.div`
  padding: 2px 10px;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Container>
        <HamburgerIcon onClick={toggleMenu} />

        <Link href="/user/LandingPage">
          <CompanyLogo src={changersHub} />
        </Link>

        {isMenuOpen && <Menu />}

        <NotificationIcon />
        <ProfileImg src={profileImg} />
      </Container>
    </div>
  );
};

export default Navbar;
