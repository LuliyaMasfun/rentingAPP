import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import diagonalYellow from "../../public/squareDigonal.png"
import Image from "next/image";
import axios from "axios";


const HeaderContainer = styled.div`
height: 200px;
background-color: #F8F360;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
width: 390px;
`;
const YellowDiagonal = styled(Image)`
float: right;
`;
const EditBtn = styled.button`
position:absolute;
margin-left: 285px;
margin-top: 30px;
width:56px;
height: 26px;
border-radius: 5px;
font-weight: 600;
color: #3A3B3C;
background-color: #EFEFEF;
`;
const TitleContainer = styled.div`
flex-direction: column;
height: 80px;
width: 200px;
margin-left: 35px;

`;
const TitleName = styled.p`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 30px;
color: #3A3B3C;
float: right;
`;
const RentalNumber = styled.p`
position: absolute;
float: right;
margin-top: 60px;
`;
const Meny = styled.div`
position: absolute;
  margin-left: 35px;
  margin-top: 85px;
  width: 220px;
  heigth: 30px;
`;
const GeneralInfo = styled.button`
font-size: 14px;
font-weight: 500;
color: #3A3B3C;

`;
const Bookings = styled.button`
float: right;
margin-top: 2px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
font-weight: 400;
`;
const SelectedIndicator = styled.div`
height: 2px;
width: 132px;
background-color: #3A3B3C;
border-radius: 1px;
`;

const HeaderRentalDetails = () => {

  let [data, setData] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/getThisHub/${id}`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const [selectedMenu, setSelectedMenu] = useState('GeneralInfo');
  function handleMenuClick(menuOption) {
    setSelectedMenu(menuOption);
  }


  return (
    <HeaderContainer>
      <YellowDiagonal src={diagonalYellow} />
      <EditBtn>Edit</EditBtn>
      <TitleContainer>
        <TitleName>{data.hubName}</TitleName>
        <RentalNumber>1234567891234</RentalNumber>
      </TitleContainer>
      <Meny>
        <GeneralInfo onClick={() => handleMenuClick('GeneralInfo')}
          selected={selectedMenu === 'GeneralInfo'}>General Information</GeneralInfo>
        <Bookings onClick={() => handleMenuClick('Bookings')}
          selected={selectedMenu === 'Bookings'}>Bookings</Bookings>

        {selectedMenu === 'GeneralInfo' && (
          <SelectedIndicator />
        )}
        {selectedMenu === 'Bookings' && (
          <SelectedIndicator style={{ marginLeft: '158px', width: '63px' }} />
        )}
      </Meny>
    </HeaderContainer>

  )
}
export default HeaderRentalDetails;