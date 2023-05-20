"use client";
import React from "react";
import styled from "@emotion/styled";
import MyActiveBooking from "../../components/ActiveBooking";
import Footer from "../../components/Footer";
import Image from "next/image";
import HubsLp from "../../../public/HubsLp.png";
import EquipmentLp from "../../../public/EquipmentLp.png";
import CommunityLp from "../../../public/CommunityLp.png";
import EventsLp from "../../../public/EventsLp.png";
import Link from "next/link";
import Navbar from "../../components/Navbar2";
import "../../styles/globals.css";
import Example from "../../components/Calendar";
import AuthService from "../../services/auth-service";
import { useEffect } from "react";
import { useState } from "react";

const Page = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DashboardTitle = styled.h1`
  margin-top: 7vh;
  margin-left: 4vh;
  color: white;
  font-weight: 600;
  font-size: 24px;
`;

const EventsImg = styled(Image)`
  margin-top: 10px;
`;
const EquipmentImg = styled(Image)`
  margin-top: 10px;
`;
const CommunityImg = styled(Image)`
  margin-top: 10px;
`;
const HubsImg = styled(Image)`
  margin-top: 10px;
`;

const LandingPage = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser({ ...currentUser });
    console.log(currentUser);
  }, []);

  console.log(user);

  return (
    <div className="h-screen w-screen flex-1 flex-grow">
      <Navbar />
      <Page>
        <MyActiveBooking />
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardContainer>
          <EventsImg src={EventsLp} />
          <Link href="/user/Equipments">
            <EquipmentImg src={EquipmentLp} />
          </Link>
          <CommunityImg src={CommunityLp} />
          <Link href="/user/Hubs">
            <HubsImg src={HubsLp} />
          </Link>
        </DashboardContainer>

        <div className="mt-10">
          <Footer />
        </div>
      </Page>
    </div>
  );
};

export default LandingPage;
