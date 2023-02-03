import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { FaRegBookmark, FaMapMarkerAlt } from "react-icons/fa";
import styled from "@emotion/styled";
import Image from 'next/image';
import Link from 'next/link';
import light from "../../public/aputure.png";
import sound from "../../public/rode.png";
import camera from "../../public/canon.png";
import Footer from "../components/Footer";


const Page = styled.div`
  position: absolute;
  height: 1384px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 800;
margin-top: 60px;
margin-left: 35px;
color: white;
`;

const ViewAll = styled.button`
position:absolute;
margin-top: 110px;
margin-left: 35px;
width: 70px;
color:white;
font-size: 12px;
background-color: transparent;
border: solid  1px white;
border-radius: 5px;

`;
const SoundFilter = styled.button`
position:absolute;
margin-top: 110px;
margin-left: 115px;
width: 70px;
color:white;
font-size: 12px;
background-color: transparent;
border: solid  1px white;
border-radius: 5px;
`;
const LightFilter = styled.button`
position:absolute;
margin-top: 110px;
margin-left: 195px;
width: 70px;
color:white;
font-size: 12px;
background-color: transparent;
border: solid  1px white;
border-radius: 5px;
`;
const CameraFilter = styled.button`
position:absolute;
margin-top: 110px;
margin-left: 275px;
width: 70px;
color:white;
font-size: 12px;
background-color: transparent;
border: solid  1px white;
border-radius: 5px;
`;

const Container = styled.div`
margin-top: 170px;
 display: flex;
  flex-direction: column;
`;
const Card = styled.div`
position absolute;
margin-bottom: 275px;
display: flex;
flex-direction: row;
justify-content: center;

`;
const EquipmentImage = styled(Image)`
position: absolute;
z-index: 0;
`;

const BookmarkIcon = styled(FaRegBookmark)`
position: absolute;
z-index:2;
margin-top: 30px;
margin-left: -30vh;
color:white;
`;

const IconButton = styled.button`
position: absolute;
z-index:3;
margin-top: 30px;
margin-left: -30vh;

`;

const Border = styled.hr`
position: absolute;
z-index:2;
border: 1px solid white;
width: 326px;
margin-top: 23vh;
`;

const Name = styled.p`
position: absolute;
z-index:2;
margin-top: 20vh;
margin-left: -15vh;
font-size: 16px;
font-weight: 700;
color: white;
width: 160px;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
position: absolute;
z-index:2;
margin-top: 24vh;
margin-left: -32vh;
color: white;
`;
const LocationTxt = styled.p`
position: absolute;
z-index:2;
margin-top: 23.6vh;
margin-left: -16vh;
color:white;
`;

const EquipmentPage = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/allEquipment');
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
  };


  const filteredEquipment = data.filter((item) => {
    if (filter === 'all') {
      return data;
    } return item.type === filter;

  });

  const checkType = (imageType) => {
    if (imageType.equipmentType == "CAMERA") {
      return camera;
    } else if (imageType.equipmentType == "LIGHT") {
      return light;
    } else {
      return sound;
    }
  }




  return (
    <Page>
      <PageTitle>Equipment</PageTitle>
      <ViewAll onClick={() => handleFilter('all')}>View all</ViewAll>
      <SoundFilter onClick={() => handleFilter('SOUND')}>Sound</SoundFilter>
      <LightFilter onClick={() => handleFilter('LIGHT')}>Light</LightFilter>
      <CameraFilter onClick={() => handleFilter('CAMERA')}>Camera</CameraFilter>
      <Container>

        {/* Map through filtered equipment and render the cards */}
        {filteredEquipment.map((item) => (
          <Card key={item.id}>
            <BookmarkIcon />
            <Border />
            <Name>
              {item.equipmentName}
            </Name>
            <LocationIcon />
            <LocationTxt>
              {item.equipmentLocation}
            </LocationTxt>
            <EquipmentImage src={checkType(item)} />
          </Card>
        ))}
      </Container>
      <Footer />
    </Page>
  );
};
export default EquipmentPage;


