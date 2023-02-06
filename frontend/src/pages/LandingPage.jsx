import React from "react";
import styled from "@emotion/styled";
import MyActiveBooking from "../components/ActiveBooking";
import Footer from "../components/Footer"
import Image from "next/image";
import HubsLp from "../../public/HubsLp.png"
import EquipmentLp from "../../public/EquipmentLp.png"
import CommunityLp from "../../public/CommunityLp.png"
import EventsLp from "../../public/EventsLp.png"
import Link from "next/link";
import Navbar from "../components/Navbar";
import "../styles/globals.css"

const Page = styled.div`
  position: absolute;
  height: 2705px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1000px;
  `;

const DashboardTitle = styled.h1`
position: absolute;
margin-top: 7vh;
margin-left: 4vh;
color: white;
font-weight: 600;
font-size: 24px;
`;

const EventsImg = styled(Image)`
margin-top: 120vh;

`;
const EquipmentImg = styled(Image)`
margin-top: 30px;
`;
const CommunityImg = styled(Image)`
margin-top: 30px;
`;
const HubsImg = styled(Image)`
margin-top: 30px;
`;



const LandingPage = () => {
  return (

    <Page>
      <Navbar />
      <MyActiveBooking />
      <DashboardTitle>Dashboard</DashboardTitle>
      <DashboardContainer>
        <EventsImg src={EventsLp} />
        <Link href="/Equipments" >
          <EquipmentImg src={EquipmentLp} />
        </Link>
        <CommunityImg src={CommunityLp} />
        <HubsImg src={HubsLp} />
      </DashboardContainer>
      <div style={{ marginTop: "1050px" }} >
        <Footer />
      </div>
    </Page>
  )
}

export default LandingPage;