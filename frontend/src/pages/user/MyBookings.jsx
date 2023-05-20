"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaWrench, FaHouseUser, FaUsers } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import "../../styles/globals.css";
import Link from "next/link";
import AuthService from "../../services/auth-service";

const Page = styled.div`
  position: absolute;
  height: 1000px;
  width: 390px;
  background-color: #1e1e1e;
  margin: 0;
`;
const PageTitle = styled.h1`
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  margin-top: 60px;
  margin-left: 35px;
  color: white;
`;

const Header = styled.div`
  height: 180px;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
`;
const SearchBar = styled.input`
  position: absolute;
  margin-left: 95px;
  margin-top: 117px;
  padding-bottom: 2px;
  background-color: transparent;
  border: 1px solid #efefef;
  border-radius: 5px;
  ::placeholder {
    color: #efefef;
    opacity: 0.4;
    padding: 10px;
    font-size: 12px;
  }
`;
const SearchTxt = styled.p`
  position: absolute;
  margin-top: 120px;
  margin-left: 35px;
  color: #ffffff;
  font-size: 14px;
`;
const SubHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SeperationBorder = styled.div`
  position: absolute;
  margin-left: 13vh;
  margin-top: 2vh;
  width: 8px;
  height: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const DropdownContainer = styled.div`
  position: absolute;
  margin-top: 21px;
  margin-left: 16vh;
`;

const TheBooking = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  margin-bottom: 93px;
`;
const BookingIndicator = styled.div`
  position: absolute;
  margin-top: 20px;
  width: 8px;
  height: 90px;
  background-color: ${({ bookingStatus }) =>
    bookingStatus === "PENDING"
      ? "#4B3F2B"
      : bookingStatus === "REJECTED"
      ? "#3E1F18"
      : bookingStatus === "APPROVED"
      ? "#2B4B30"
      : bookingStatus === "ACTIVE"
      ? "#F8F360"
      : "#3A3B3C"};
`;
const Name = styled.p`
  position: absolute;
  margin-top: 25px;
  margin-left: 82px;
  color: white;
  font-size: ;
  font-weight: 500;
`;
const CreatedOn = styled.p`
  position: absolute;
  margin-top: 48px;
  margin-left: 230px;
  color: white;
  font-size: 14px;
`;
const BookingNumber = styled.p`
  position: absolute;
  margin-top: 48px;
  margin-left: 82px;
  color: white;
  font-size: 14px;
`;
const EquipmentIcon = styled(FaWrench)`
  position: absolute;
  margin-top: 45px;
  margin-left: 31px;
  width: 24px;
  height: 24px;
  color: white;
`;
const HubIcon = styled(FaHouseUser)`
  position: absolute;
  margin-top: 50px;
  margin-left: 31px;
  width: 24px;
  height: 24px;
  color: white;
`;
const EventIcon = styled(FaUsers)`
  position: absolute;
  margin-top: 45px;
  margin-left: 31px;
  width: 24px;
  height: 24px;
  color: white;
`;
const SideIcon = styled(IoChevronForward)`
  position: absolute;
  margin-top: 45px;
  margin-left: 350px;
  width: 24px;
  height: 24px;
  color: white;
`;
const BookedItem = styled.p`
  position: absolute;
  margin-top: 75px;
  margin-left: 82px;
  color: white;
  font-size: 14px;
`;
const BookingStatus2 = styled.p`
  position: absolute;
  font-size: 14px;
  color: white;
  margin-top: 28px;
  margin-left: 230px;
`;
const Border = styled.hr`
  position: absolute;
  margin-top: 110px;
  height: 1px;
  width: 390px;
  border: 1px solid white;
  opacity: 0.5;
`;
const TotalBookings = styled.div`
  position: absolute;
  margin-top: -30px;
  margin-left: 33px;
  font-size: 16px;
  color: #efefef;
`;

const AcceptBtn = styled.button`
  position: absolute;
  margin-top: 75px;
  margin-left: 227px;
  height: 25px;
  width: 60px;
  color: #efefef;
  font-size: 14px;
  background-color: #2b4b30;
  border-radius: 2px;
`;
const RejectBtn = styled.button`
  position: absolute;
  margin-top: 75px;
  margin-left: 315px;
  height: 25px;
  width: 50px;
  color: #efefef;
  font-size: 14px;
  background-color: #3e1f18;
  border-radius: 2px;
`;

const MyBookings = () => {
  const [data, setData] = useState([]);
  const [rentalNames, setRentalNames] = useState({});

  useEffect(() => {
    const userId = AuthService.getCurrentUser().id;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bookingsV2/bookingsOnThisUser/${userId}`
        );
        if (response.data.length > 0) {
          setData(response.data);
          console.log(response.data);
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
        console.log(data);
        const rentalIds = data.map((booking) => booking.rental.id).join(",");
        console.log("rentalIds", rentalIds);
        const response = await axios.get(
          `http://localhost:8080/rental/rentalNames?ids=${rentalIds}`
        );
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

  const totalNumbersOfBookings = data.length;
  return (
    <Page>
      <Navbar />
      <PageTitle> My Bookings</PageTitle>
      <Header>
        <SearchBar
          placeholder="Booking number"
          //onChange={ }
        ></SearchBar>
        <SearchTxt>Search: </SearchTxt>
      </Header>
      <SeperationBorder />
      <SubHeaderContainer>
        <DropdownContainer></DropdownContainer>
      </SubHeaderContainer>
      <div>
        <TotalBookings>Bookings ({totalNumbersOfBookings})</TotalBookings>
        {data.map((booking) => (
          <TheBooking key={booking.id}>
            <Name>
              {booking.user
                ? `${booking.user.firstName} ${booking.user.lastName}`
                : "Unknown"}
            </Name>
            <BookingNumber>{booking.bookingNumber}</BookingNumber>
            <CreatedOn>
              {booking.createdOn ? booking.createdOn.substring(0, 10) : ""}
            </CreatedOn>
            <BookedItem>{rentalNames[booking.rentalId]}</BookedItem>

            {`${booking.rental.rentalType}` === "HUB" && <HubIcon />}
            {`${booking.rental.rentalType}` === "EQUIPMENT" && (
              <EquipmentIcon />
            )}
            {`${booking.rental.rentalType}` === "EVENT" && <EventIcon />}
            <Link
              href="bookingRequestDetails/[id]"
              as={`/admin/bookingRequestDetails/${booking.id}`}
            ></Link>
            <BookingIndicator bookingStatus={booking.bookingStatus} />
            <BookedItem>
              {booking.rental ? `${booking.rental.name}` : "Unknown"}
            </BookedItem>
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
                <RejectBtn onClick={() => handleApproveBooking(booking?.id)}>
                  Delete
                </RejectBtn>
              </div>
            )}
            <Border />
          </TheBooking>
        ))}
      </div>
    </Page>
  );
};

export default MyBookings;
