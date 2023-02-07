import React from "react";
import styled from "@emotion/styled";
import { FaFacebook, FaInstagram } from "react-icons/fa";


const Container = styled.div`
position: absolute;
background-color: #3A3B3C;
width: 390px;
height: 450px;
`;

const HqTitle1 = styled.h1`
position: absolute;
font-size: 18px;
font-weight: 800;
margin-left: 5vh;
margin-top: 3vh;
color:white;
`;

const SubTitles1 = styled.div`
position: absolute;
margin-left: 5vh;
font-size: 12px;
margin-top: 52px;
color:white;
`;
const CompanyName1 = styled.p``;
const Address1 = styled.p``;
const PostalCode1 = styled.p``;

const KistTitle = styled.h1`
position: absolute;
font-size: 18px;
font-weight: 800;
margin-left: 5vh;
margin-top: 14.7vh;
color:white;
`;

const SubTitles2 = styled.div`
position: absolute;
margin-left: 5vh;
font-size: 12px;
margin-top: 150px;
color:white;
`;

const CompanyName2 = styled.p``;
const Address2 = styled.p``;
const PostalCode2 = styled.p``;

const OpeningHoursTxt = styled.h1`
position: absolute;
font-size: 14px;
font-weight: 800;
margin-left: 5vh;
margin-top: 26vh;
color:white;
`;

const SubTitles3 = styled.div`
position: absolute;
margin-left: 5vh;
font-size: 12px;
margin-top: 29vh;
color:white;
`;
const Days = styled.p``;
const Time = styled.p``;
const Contact = styled.p``;

const Border = styled.hr`
position: absolute;
width: 390px;
border: 1px solid white;
margin-top: 38vh;
`;

const EmailAddress = styled.p`
position: absolute;
margin-top:42vh;
margin-left: 12vh;
font-size:12px;
color: white;
`;

const FacebookIcon = styled(FaFacebook)`
position: absolute;
margin-top:45vh;
margin-left: 18vh;
width: 24px;
height: 24px;
color: white;
`;
const InstagramIcon = styled(FaInstagram)`
position: absolute;
margin-top:45vh;
margin-left: 23vh;
width: 24px;
height: 24px;
color: white;
`;


const Footer = () => {
  return (
    <Container>
      <HqTitle1>CHANGERS HUB HQ</HqTitle1>
      <SubTitles1>
        <CompanyName1>CHANGERS HUB HQ</CompanyName1>
        <Address1>Rotemannavägen 29</Address1>
        <PostalCode1>145 57 Norsborg</PostalCode1>
      </SubTitles1>
      <KistTitle>CHANGERS HUB KISTA</KistTitle>
      <SubTitles2>
        <CompanyName2>CHANGERS HUB KISTA</CompanyName2>
        <Address2>Arne Beurlings Torg 9A</Address2>
        <PostalCode2>164 40 Kista</PostalCode2>
      </SubTitles2>
      <OpeningHoursTxt>OPENING HOURS</OpeningHoursTxt>
      <SubTitles3>
        <Days> Måndag - Fredag</Days>
        <Time>Från 10.00 - 16.00</Time>
        <Contact>Kontakta personal innan.</Contact>
      </SubTitles3>
      <Border />

      <EmailAddress>RENTING@CHANGERSHUB.SE</EmailAddress>
      <FacebookIcon />
      <InstagramIcon />
    </Container>
  )
}

export default Footer;
