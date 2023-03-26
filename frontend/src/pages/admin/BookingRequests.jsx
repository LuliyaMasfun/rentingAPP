import React from "react";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled"
import { useState, useEffect } from "react";
import { IoChevronForward } from 'react-icons/io5';
import Booking from "../../components/Booking";


const Page = styled.div`
  position: absolute;
  height: 1080px;
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
const Header = styled.div`
height: 180px;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
`;
const SearchBar = styled.input`
position:absolute;
margin-left: 95px;
margin-top: 117px;
padding-bottom:2px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;  
 ::placeholder {
    color: #fff;
    opacity: 0.4;
    padding:10px;
    font-size: 12px;
  }
`;
const SearchTxt = styled.p`
position: absolute;
margin-top: 120px;
margin-left: 35px;
color: #ffffff;
font-size:14px;
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
  margin-left:16vh;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: #EFEFEF;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 1px;
  background-color: #EFEFEF;
  border-radius: 5px;
  color: #3A3B3C;
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
color: #EFEFEF;
transform: rotate(90deg);
`;
const CreateBtn = styled.button`
position: absolute;
margin-left: 31vh;
margin-top: 21px;
font-size: 14px;
color: #F8F360;
`;
const DeleteBtn = styled.button`
position: absolute;
margin-left: 38vh;
margin-top: 21px;
font-size: 14px;
color: #F8F360;
`;

const Bookings = styled.div``;

function ManageBookings() {

  const options = [
    "View All",
    "Pending",
    "Rejected",
    "Approved",

  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <Page>
      <Navbar />
      <Header>
        <PageTitle>Booking Requests</PageTitle>
        <SearchBar
          placeholder="Booking number"
        //onChange={ }
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

        </DropdownContainer>
      </SubHeaderContainer>
      <CreateBtn>Create</CreateBtn>
      <DeleteBtn>Delete</DeleteBtn>

      <Bookings>
        <Booking />
      </Bookings>
    </Page>
  )
}

export default ManageBookings;