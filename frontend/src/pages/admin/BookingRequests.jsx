import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import Booking from "../../components/BookingsCard";
import Link from "next/link";
import bookingservice from "../../services/booking-service";

const Page = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #1e1e1e;
  margin: 0;
  flex-grow: 1;
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

const DropdownButton = styled.button`
  background-color: transparent;
  color: #efefef;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 1px;
  background-color: #efefef;
  border-radius: 5px;
  color: #3a3b3c;
  z-index: 1;
`;

const DropdownMenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
`;
const DownIcon = styled(IoChevronForward)`
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: 7vh;
  margin-top: -2.5vh;
  color: #efefef;
  transform: rotate(90deg);
`;
const CreateBtn = styled.button`
  position: absolute;
  margin-left: 38vh;
  margin-top: 21px;
  font-size: 14px;
  color: #f8f360;
`;
const DeleteBtn = styled.button`
  position: absolute;
  margin-left: 38vh;
  margin-top: 21px;
  font-size: 14px;
  color: #f8f360;
`;

const Bookings = styled.div``;

function ManageBookings() {
  const options = ["View All", "Pending", "Rejected", "Approved"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingRequestList, setBookingRequestList] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const resp = bookingservice.getAllBookings();
        setBookingRequestList(resp.data);
      } catch (Error) {
        console.log(Error);
      }
      fetchData();
    };
  }, []);

  return (
    <Page>
      <NavbarAdmin />
      <Header>
        <PageTitle>Booking Requests</PageTitle>
        <SearchBar
          placeholder="Booking number"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></SearchBar>
        <SearchTxt>Search: </SearchTxt>
      </Header>
      <SeperationBorder />
      <SubHeaderContainer>
        <DropdownContainer>
          <DropdownButton onClick={() => setIsOpen(!isOpen)}>
            {selectedOption}
            <DownIcon />
          </DropdownButton>
          {isOpen && (
            <DropdownMenu>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          )}
          {bookingRequestList
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.booking_number
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
              // else {
              //   return "";
              // }
            })
            .map(val, (key) => {
              return (
                <div key={key}>
                  <p> val.booking_number</p>
                </div>
              );
            })}
        </DropdownContainer>
      </SubHeaderContainer>
      <Link
        href={{
          pathname: "/admin/CreateBooking",
        }}
      >
        <CreateBtn>Create</CreateBtn>
      </Link>
      <Bookings>
        <Booking />
      </Bookings>
    </Page>
  );
}

export default ManageBookings;
