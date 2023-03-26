"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled";
import "../styles/globals.css";
import bookingImg from "../../public/bookingImg.png"
import Image from "next/image";

const bookings = [
  {
    id: 1,
    equipmentName: 'Canon 70c',
    equipBookedImg: '../../public/bookingImg.png',
    startDate: '12 Feb',
    endDate: '14 Feb',
    pickUp: '12:00',
    dropOff: '13:00',
    bookingStatus: 'PENDING'
  }
]
const Page = styled.div`
  position: absolute;
  height: 1000px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;
const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: white;
`;
const Card = styled.div``;

const Booking = styled.div`
`;

const BookingImg = styled(Image)`
position:absolute;
margin-top: 18vh;
margin-left:3.5vh;
`;

const EquipmentName = styled.p`
position: absolute;
margin-top: 18vh;
margin-left: 15vh;
color: white;
font-weight: 700;
`;

const StartDateTitle = styled.p`
position: absolute;
margin-top: 21vh;
margin-left: 15vh;
font-size: 12px;
color: #A9A9A9;
`;

const StartDate = styled.p`
position: absolute;
margin-top: 21vh;
margin-left: 25vh;
font-size: 12px;
color: #ffffff;
`;
const EndDateTitle = styled.p`
position: absolute;
margin-top: 23vh;
margin-left: 15vh;
font-size: 12px;
color: #A9A9A9;
`;
const EndDate = styled.p`
position: absolute;
margin-top: 23vh;
margin-left: 25vh;
font-size: 12px;
color: #ffffff;
`;
const PickUpTitle = styled.p`
position: absolute;
margin-top: 26vh;
margin-left: 15vh;
font-size: 12px;
color: #A9A9A9;
`;
const Pickup = styled.p`
position: absolute;
margin-top: 26vh;
margin-left: 25vh;
font-size: 12px;
color: #ffffff;
`;
const DropOffTitle = styled.p`
position: absolute;
margin-top: 28vh;
margin-left: 15vh;
font-size: 12px;
color: #A9A9A9;
`;
const DropOff = styled.p`
position: absolute;
margin-top: 28vh;
margin-left: 25vh;
font-size: 12px;
color: #ffffff;
`;
const BookingStatusContainer = styled.div`
position: absolute;
background-color: #F19F4D;
width: 65px;
border-radius: 10px;
margin-top: 31vh;
margin-left:15vh;
`;
const BookingStatus = styled.p`
font-size: 12px;
color: white;
font-weigth: 600;
text-align: center;
`;
const CancelBtn = styled.button`
position: absolute;
margin-top: 31vh;
margin-left:29vh;
background-color: #3A3B3C;
width: 55px;
heigth: 30px;
border-radius: 5px;
color: #ffffff;
font-size: 14px;
font-weight: 600;

`;
const EditBtn = styled.button`
position: absolute;
margin-top: 31vh;
margin-left:37vh;
background-color: transparent;
border: 1px solid #F8F360;
width: 45px;
border-radius: 5px;
color: #ffffff;
font-size: 14px;
font-weight: 600;
`;
const Border = styled.hr`
position: absolute;
width: 390px;
margin-top: 36vh;
`;



const MyBookings = ({ booking }) => {
  return (
    <Page>
      <Navbar />
      <PageTitle> My Bookings</PageTitle>
      {bookings.map(booking => (
        <Card key={bookings.id}>
          <Booking booking={booking} key={bookings.id} >
            <EquipmentName>{booking.equipmentName}</EquipmentName>
            <BookingImg src={bookingImg} />
            <StartDateTitle>Start date</StartDateTitle>
            <StartDate>{booking.startDate}</StartDate>
            <EndDateTitle>End date</EndDateTitle>
            <EndDate>{booking.endDate}</EndDate>
            <PickUpTitle>Pick up</PickUpTitle>
            <Pickup>{booking.pickUp}</Pickup>
            <DropOffTitle>Drop off</DropOffTitle>
            <DropOff>{booking.dropOff}</DropOff>
            <BookingStatusContainer>
              <BookingStatus>{booking.bookingStatus}</BookingStatus>
            </BookingStatusContainer>
            <CancelBtn>Cancel</CancelBtn>
            <EditBtn>Edit</EditBtn>
          </Booking>
          <Border />
        </Card>
      ))}
    </Page>
  )
}

export default MyBookings;
