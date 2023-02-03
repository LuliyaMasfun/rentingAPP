import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { FaRegBookmark, FaMapMarkerAlt } from "react-icons/fa";
import styled from "@emotion/styled";
import Image from 'next/image';
import light from "../../public/aputure.png";
import sound from "../../public/rode.png";
import camera from "../../public/canon.png";

const Page = styled.div`
  height: 1584px;
  width: 390px;
  background-color: #1E1E1E;
`;

const Container = styled.div`
margin-top: 140px;
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
margin-left: 2vh;
`;

const BookmarkIcon = styled(FaRegBookmark)`
position: absolute;
z-index:2;
margin-top: 30px;
margin-left: -30vh;
color:white;
`;

const Border = styled.hr`
position: absolute;
z-index:2;
border: 1px solid white;
width: 326px;
margin-top: 23vh;
margin-left: 2vh;
`;

const Name = styled.p`
position: absolute;
z-index:2;
margin-top: 20vh;
margin-left: -18vh;
font-size: 16px;
font-weight: 700;
color: white;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
position: absolute;
z-index:2;
margin-top: 24vh;
margin-left: -30vh;
color: white;
`;
const LocationTxt = styled.p`
position: absolute;
z-index:2;
margin-top: 23.6vh;
margin-left: -14vh;
color:white;
`;

const EquipmentPage = () => {
  const [data, setData] = useState([]);

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

  const checkType = (item) => {

    if (item.equipmentType == "CAMERA") {
      return camera;
    } else if (item.equipmentType == "LIGHT") {
      return light;
    } else {
      return sound;
    }
  }

  return (
    <Container>
      {data ? data.map((item) => (
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
      )) : <p>Loading...</p>}
    </Container>
  );
};
export default EquipmentPage;


