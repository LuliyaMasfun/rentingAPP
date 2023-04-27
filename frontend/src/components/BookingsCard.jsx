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
      : bookingStatus === "REJECTED"
        ? "#3E1F18"
        : bookingStatus === "APPROVED"
          ? "#2B4B30"
          : bookingStatus === "ACTIVE"
            ? "#F8F360"
            : "#3A3B3C"}
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
margin-left: 230px;
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
const BookingStatus2 = styled.p`
position: absolute;
font-size: 14px;
color: white;
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

const AcceptBtn = styled.button`
position: absolute;
margin-top:75px;
margin-left: 227px;
height: 25px;
width: 60px;
color: #EFEFEF;
font-size: 14px;
background-color: #2B4B30;
border-radius: 2px;
`;
const RejectBtn = styled.button`
position: absolute;
margin-top:75px;
margin-left: 292px;
height: 25px;
width: 50px;
color: #EFEFEF;
font-size: 14px;
background-color: #3E1F18;
border-radius: 2px;
`;
const SavedMessageContainer = styled.div`
width: 280px;
margin-left: 55px;
margin-top: 700px;
position: fixed;
transition: visibility 0.5s ease-in-out;
`;
const SaveMessage = styled.p`
text-align: center;
font-weight: 600;
background-color: #F8F360;
border-radius: 2px;
`;


function Booking() {
  const [data, setData] = useState([]);
  const [rentalNames, setRentalNames] = useState({});
  const [bookingStatus, setBookingStatus] = useState('PENDING');
  const [savedMessage, setSavedMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);;

  const handleRejectBooking = (id) => {
    axios.put(`http://localhost:8080/bookingsV2/updateBookingStatus/${id}`, {
      bookingStatus: "REJECTED"
    })
      .then(response => {
        // handle success
        console.log(response);

        setSavedMessage(`${data.bookingNumber} was ${data.bookingStatus}`);
        setTimeout(() => {
          setSavedMessage(null);
        }, 3000);
        window.location.reload();
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  const handleApproveBooking = (id) => {
    axios.put(`http://localhost:8080/bookingsV2/updateBookingStatus/${id}`, {
      bookingStatus: "APPROVED"
    })
      .then(response => {
        // handle success
        console.log(response);

        setSavedMessage(`${data.bookingNumber} was ${data.bookingStatus}`);
        setTimeout(() => {
          setSavedMessage(null);
        }, 3000);

        window.location.reload();
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookingsV2/allBookings`);
        if (response.data.length > 0) {
          setData(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRentalNames = async () => {
      try {
        console.log(data)
        const rentalIds = data.map((booking) => booking.rental.id).join(",");
        console.log("rentalIds", rentalIds);
        const response = await axios.get(`http://localhost:8080/rental/rentalNames?ids=${rentalIds}`);
        if (Array.isArray(response.data)) {
          const rentalNamesMap = response.data.reduce((map, rental) => {
            map[rental.id] = rental.name;
            return map;
          }, {});
          setRentalNames(rentalNamesMap);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRentalNames();
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

  const handleSelect = (id) => {
    setSelected(id);
  };

  const totalNumbersOfBookings = data.length;

  return (

    <div>
      <TotalBookings>
        Bookings ({totalNumbersOfBookings})
      </TotalBookings>
      {data.map((booking) => (
        <TheBooking key={booking.id}>
          <Name>{booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : 'Unknown'}</Name>
          <BookingNumber>{booking.bookingNumber}</BookingNumber>
          <CreatedOn>{booking.createdOn ? booking.createdOn.substring(0, 10) : ''}</CreatedOn>
          <BookedItem>{rentalNames[booking.rentalId]}</BookedItem>
          <HubIcon />
          <Link href="bookingRequestDetails/[id]" as={`/admin/bookingRequestDetails/${booking.id}`}>
            <SideIcon />
          </Link>
          <BookingIndicator bookingStatus={booking.bookingStatus} />
          <BookedItem>{booking.rental ? `${booking.rental.name}` : 'Unknown'}</BookedItem>
          {booking?.bookingStatus === "PENDING" && (
            <BookingStatus2>Pending</BookingStatus2>
          )}
          {booking?.bookingStatus === "APPROVED" && (
            <BookingStatus2>Approved</BookingStatus2>
          )}
          {booking?.bookingStatus === "ACTIVE" && (
            <BookingStatus2>Active</BookingStatus2>
          )}
          {booking?.bookingStatus === "COMPLETED" && (
            <BookingStatus2>Completed</BookingStatus2>
          )}
          {booking?.bookingStatus === "REJECTED" && (
            <BookingStatus2>Rejected</BookingStatus2>
          )}

          {booking?.bookingStatus === "PENDING" && (
            <div>
              <SavedMessageContainer>
                {savedMessage && <SaveMessage>{savedMessage}</SaveMessage>}
              </SavedMessageContainer>
              <RejectBtn onClick={() => handleApproveBooking(booking?.id)}>Reject</RejectBtn>
              <AcceptBtn onClick={() => handleRejectBooking(booking?.id)}>Approve</AcceptBtn>
            </div>
          )}
          <Border />
        </TheBooking>


      ))
      }

    </div>

  )
}

export default Booking;