import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import styled from "@emotion/styled";
import AuthService from "../services/auth.service";
import axios from "axios";


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
const StartDate = styled.p``;
const EndDate = styled.p``;



const MyActiveBooking = () => {
  const [data, setData] = useState([]);

  /*
  const currentUser = AuthService.getCurrentUser();
  const userId = currentUser ? JSON.parse(currentUser)?.id : null;
*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookingsV2/bookingsOnThisUser/${userId}`);
        if (response.data.length > 0) {
          const today = new Date();
          const closestBooking = response.data.filter(booking => {
            const bookingDate = new Date(booking.startDateTime);
            return bookingDate >= today;
          })[0];
          setData([closestBooking]);
          console.log(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {
        data ? (
          <ActiveBookingCard>
            <CardTitle>My Active Bookings</CardTitle>
            <OptionIcon />
            <Border />
            <NoBookings>{ }</NoBookings>
            <StartCard>
              <StartDateTitle>Start date</StartDateTitle>
              <StartDate>{data.startDateTime}</StartDate>

            </StartCard>
            <EndCard>
              <EndDateTitle>End date</EndDateTitle>
              <EndDate>{data.endDateTime}</EndDate>
            </EndCard>
          </ActiveBookingCard>
        ) : (
          <ActiveBookingCard>
            <CardTitle>My Active Bookings</CardTitle>
            <OptionIcon />
            <Border />
            <NoBookings>No active bookings</NoBookings>

          </ActiveBookingCard>
        )}
    </div>
  )
}

export default MyActiveBooking;