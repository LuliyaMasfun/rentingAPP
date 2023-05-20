import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import styled from "@emotion/styled";
import AuthService from "../services/auth-service";
import axios from "axios";
import Link from "next/link";

const ActiveBookingCard = styled.div`
  width: 346px;
  min-height: 300px;
  background-color: #393939;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  flex-grow: 1;
  max-height: 600px;
  overflow: auto;
  transition: max-height 0.3s ease;
`;

const CardTitle = styled.p`
  position: absolute;
  margin-top: 1.5vh;
  margin-left: 3vh;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const OptionIcon = styled(IoEllipsisHorizontalCircle)`
  position: absolute;
  margin-top: 2vh;
  margin-left: 36.5vh;
  color: white;
`;
const Border = styled.hr`
  position: absolute;
  width: 344px;
  margin-top: 5vh;
  color: #a9a9a9;
  opacity: 0.5;
`;
const NoBookings = styled.p`
  position: absolute;
  margin-top: 8vh;
  margin-left: 12vh;
  color: #8e8e8e;
`;
const StartCard = styled.div`
  position: absolute;
  background-color: #424242;
  margin-left: 3vh;
  margin-top: 109px;
  width: 130px;
  height: 41px;
  border-radius: 10px;
`;
const StartDateTitle = styled.p`
  margin-top: 0.5vh;
  margin-left: 1vh;
  font-size: 12px;
  color: #8e8e8e;
`;
const EndCard = styled.div`
  position: absolute;
  background-color: #424242;
  margin-left: 23vh;
  margin-top: 109px;
  width: 130px;
  height: 41px;
  border-radius: 10px;
`;
const EndDateTitle = styled.p`
  margin-top: 0.5vh;
  margin-left: 1vh;
  font-size: 12px;
  color: #8e8e8e;
`;
const StartDate = styled.p`
  color: #fefefe;
  font-size: 12px;
  margin-left: 9px;
`;
const EndDate = styled.p`
  color: #fefefe;
  font-size: 12px;
  margin-left: 9px;
`;
const BookingName = styled.p`
  width: 100%;
  margin-top: 6vh;
  margin-left: 3vh;
  color: #fefefe;
  font-size: 16px;
`;
const BookingStatus = styled.p`
  position: absolute;
  margin-top: 9vh;
  margin-left: 3vh;
  color: #8e8e8e;
  font-size: 12px;
`;

const MyActiveBooking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = AuthService.getCurrentUser().id;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/rental/getAllRentals`
        );
        if (response.data.length > 0) {
          setData(response.data);
        }

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {data.length > 0 ? (
        <Link
          href={{
            pathname: "/../user/MyBookings",
          }}
        >
          <ActiveBookingCard>
            <CardTitle>My Active Bookings</CardTitle>
            <OptionIcon />
            <Border />
            <BookingName>
              {/* {[data.rental ? data.rental.name : "NaN"]} */}
              {data.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex-col bg-slate-500 p-6 w-full h-full my-6 items-center justify-center"
                  >
                    <p className="text-white pr-2">
                      {" "}
                      name: {item.userDto.firstName}
                    </p>
                    <p>hubType:{item.hubType}</p>
                  </div>
                );
              })}
            </BookingName>
            <BookingStatus>{[data.bookingStatus]}</BookingStatus>
            {/* <StartCard>
              <StartDateTitle>Start date</StartDateTitle>
              <StartDate>{[data.startDateTime]}</StartDate>
            </StartCard>
            <EndCard>
              <EndDateTitle>End date</EndDateTitle>
              <EndDate>{data.endDateTime}</EndDate>
            </EndCard> */}
          </ActiveBookingCard>
        </Link>
      ) : (
        <ActiveBookingCard>
          <CardTitle>My Active Bookings</CardTitle>
          <OptionIcon />
          <Border />
          <NoBookings>No active bookings</NoBookings>
        </ActiveBookingCard>
      )}
    </div>
  );
};

export default MyActiveBooking;
