import React from "react";
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import styled from "@emotion/styled";


const ActiveBookingCard = styled.div`
width:346px;
height: 160px;
background-color: #393939;
border-radius: 20px;

margin-top: 40px;
margin-left: 2.5vh;
`;

const CardTitle = styled.p`
position: absolute;
margin-top: 1.5vh;
margin-left: 3vh;
font-size: 16px;
font-weight: 600;
color:white;
`;
const OptionIcon = styled(IoEllipsisHorizontalCircle)`
position:absolute;
margin-top: 2vh;
margin-left: 36.5vh;
color: white;
`;
const Border = styled.hr`
position: absolute;
width: 344px;
margin-top: 5vh;
color: #A9A9A9;
opacity: 0.5;
`;
const NoBookings = styled.p`
position:absolute;
margin-top: 8vh;
margin-left: 12vh;
color: #8E8E8E;

`;
const StartCard = styled.div`
position:absolute;
background-color:#424242;
margin-left:3vh;
margin-top: 109px;
width: 130px;
height: 41px;
border-radius: 10px;
`;
const StartDateTitle = styled.p`
margin-top: 0.5vh;
margin-left: 1vh; 
font-size: 12px;
color: #8E8E8E;

`;
const EndCard = styled.div`
position:absolute;
background-color:#424242;
margin-left:23vh;
margin-top: 109px;
width: 130px;
height: 41px;
border-radius: 10px;
`;
const EndDateTitle = styled.p`
margin-top: 0.5vh;
margin-left: 1vh; 
font-size: 12px;
color: #8E8E8E;
`;


const MyActiveBooking = () => {
  return (

    <ActiveBookingCard>
      <CardTitle>My Active Bookings</CardTitle>
      <OptionIcon />
      <Border />
      <NoBookings>No active bookings</NoBookings>
      <StartCard>
        <StartDateTitle>Start date</StartDateTitle>
      </StartCard>
      <EndCard>
        <EndDateTitle>End date</EndDateTitle>
      </EndCard>
    </ActiveBookingCard>
  )
}

export default MyActiveBooking;