import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from 'axios';
import { FaWrench, FaHouseUser, FaUsers } from "react-icons/fa";
import { IoChevronForward } from 'react-icons/io5';
import rejected from '../../public/rejected.png'
import approved from '../../public/approved.png'
import pending from '../../public/pending.png'
import Image from "next/image";
import "../styles/globals.css"
import Link from "next/link";

const TheBooking = styled.div`
margin-top: 50px;
display: flex;
flex-direction: column;
margin-bottom: 93px;
 
`;
const BookingIndicator = styled.div`
position: absolute;
margin-top: 20px;
width: 8px;
height: 90px;
background-color:${({ bookingStatus }) =>
    bookingStatus === "PENDING"
      ? "#4B3F2B"
      : bookingStatus === "APPROVED"
        ? "#2B4B30"
        : "#3E1F18"};
`;
const Name = styled.p`
position: absolute;
margin-top:25px;
margin-left: 82px;
color: white;
font-size: ;
font-weight: 500;
`;
const CreatedOn = styled.p`
position: absolute;
margin-top:48px;
margin-left: 232px;
color: white;
font-size: 14px;
`;
const BookingNumber = styled.p`
position: absolute;
margin-top:48px;
margin-left: 82px;
color: white;
font-size: 14px;

`;
const EquipmentIcon = styled(FaWrench)`
position: absolute;
margin-top:45px;
margin-left: 31px;
width: 24px;
height: 24px;
color: white;
`;
const HubIcon = styled(FaHouseUser)`
position: absolute;
margin-top:50px;
margin-left: 31px;
width: 24px;
height: 24px;
color: white;
`;
const EventIcon = styled(FaUsers)`
position: absolute;
margin-top:45px;
margin-left: 31px;
width: 24px;
height: 24px;
color: white;
`;
const SideIcon = styled(IoChevronForward)`
position: absolute;
margin-top:45px;
margin-left: 350px;
width: 24px;
height: 24px;
color: white;
`;
const BookedItem = styled.p`
position: absolute;
margin-top:75px;
margin-left: 82px;
color: white;
font-size: 14px;
`;
const BookingStatus2 = styled(Image)`
position: absolute;
margin-top:28px;
margin-left: 230px;
`;
const Border = styled.hr`
position:absolute;
margin-top: 110px;
  height: 1px;
  width: 390px;
  border: 1px solid white;
  opacity: 0.5;

`;
const TotalBookings = styled.div`
position: absolute;
margin-top: -30px;
margin-left:33px;
font-size: 16px;
color: #EFEFEF;
`;

function Booking() {
  const [data, setData] = useState([]);
  const [hubNames, setHubNames] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookings/allHubBookings`);
        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchHubNames = async () => {
      try {
        console.log(data)
        const hubIds = data.map((booking) => booking.hub.id).join(",");
        console.log("hubIds", hubIds);
        const response = await axios.get(`http://localhost:8080/hub/hubNames?ids=${hubIds}`);
        if (Array.isArray(response.data)) {
          const hubNamesMap = response.data.reduce((map, hub) => {
            map[hub.id] = hub.hubName;
            return map;
          }, {});
          setHubNames(hubNamesMap);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHubNames();
  }, [data]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(data)
        const userIds = data.map((booking) => booking.user.id).join(",");
        console.log("userIds", userIds);
        const response = await axios.get(`http://localhost:8080/user/userInfo?ids=${userIds}`);
        if (Array.isArray(response.data)) {
          const userInfoMap = response.data.reduce((map, userInfo) => {
            map[user.id] = user.firstName;
            return map;
          }, {});
          setUserInfo(userInfoMap);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [data]);

  const checkBookingStatus = (status) => {
    if (status.bookingStatus == "PENDING") {
      return pending;

    } else if (status.bookingStatus == "REJECTED") {
      return rejected;
    } else {
      return approved;
    }
  }

  const checkBookingType = (type) => {
    if (type.bookingType == "HUB") {
      return <HubIcon />;
    } else if (type.bookingType == "EQUIPMENT") {
      return <EquipmentIcon />;
    } else {
      return <EventIcon />;
    }
  }

  const totalNumbersOfBookings = data.length;

  return (

    <div>
      <TotalBookings>
        Bookings ({totalNumbersOfBookings})
      </TotalBookings>
      {data.map((booking) => (
        <TheBooking key={booking.bookingId}>
          <Name>{booking.user.firstName} {booking.user.lastName}</Name>
          <BookingNumber>{booking.bookingNumber}</BookingNumber>
          <CreatedOn>{booking.createdOn.substring(0, 10)}</CreatedOn>
          <BookedItem>{hubNames[booking.hubId]}</BookedItem>
          <HubIcon />
          <Link href="bookingRequestDetails/[id]" as={`/admin/bookingRequestDetails/${booking.id}`}>
            <SideIcon />
          </Link>
          <BookingIndicator bookingStatus={booking.bookingStatus} />
          <BookedItem>{booking.hub.hubName}</BookedItem>
          <BookingStatus2 src={checkBookingStatus(booking)} />
          <Border />
        </TheBooking>


      ))
      }

    </div>

  )
}

export default Booking;