import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import profileImg from "../../public/profilePic16.png";
import { IoFilter } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import changersHub from "../../public/changershub.png";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px;
  background-color: #1e1e1e;
  height: 50px;
  width: 390px;
`;
const HamburgerIcon = styled(IoFilter)`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 0;
  margin-left: 4vh;
  color: #ffffff;
`;
const CompanyLogo = styled(Image)`
  position: absolute;
  margin-left: 9vh;
  margin-top: -1.5vh;
  left: 0;
`;
const NotificationIcon = styled(FaRegBell)`
  position: absolute;
  margin-left: 24vh;
  width: 24px;
  height: 24px;
  color: #ffffff;
`;
const ProfileImg = styled(Image)`
  position: absolute;
  margin-left: 35vh;
`;

const Navbar = () => {
  return (
    <Container>
      <HamburgerIcon />
      <Link href="/LandingPage">
        <CompanyLogo src={changersHub} />
      </Link>

      <NotificationIcon />
      <ProfileImg src={profileImg} />
    </Container>
  );
};

export default Navbar;
