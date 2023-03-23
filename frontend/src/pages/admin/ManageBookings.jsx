import React from "react";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled"
import { useState } from "react";
import { IoChevronForward } from 'react-icons/io5';

const Page = styled.div`
  position: absolute;
  height: 2705px;
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
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;  
margin-left: 95px;
margin-top: 120px;
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

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 16px;
  margin-left:135px;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-size: 12px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: transparent;
  border: none;
  color: #EFEFEF;
  z-index: 1;
`;

const DropdownMenuItem = styled.div`
  font-size: 12px;
  cursor: pointer;
  
`;
const DownIcon = styled(IoChevronForward)`
position: absolute;
margin-left: 6vh;
margin-top: -2vh;
color: #EFEFEF;
transform: rotate(90deg);
`;

const TotalBookings = styled.div`
position: absolute;
margin-top: 20px;
margin-left:33px;
font-size: 12px;
color: #EFEFEF;
`;
const CreateBtn = styled.button`
position: absolute;
margin-left: 31vh;
margin-top: -2vh;
font-size: 12px;
color: #F8F360;
`;
const DeleteBtn = styled.button`
position: absolute;
margin-left: 37vh;
margin-top: -2vh;
font-size: 12px;
color: #F8F360;
`;

function ManageBookings() {
  const options = [
    "View All",
    "Option 2",
    "Option 3"
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
          type="password"
          name="password"
          placeholder="Booking number"
        //onChange={ }
        ></SearchBar>
        <SearchTxt>Search: </SearchTxt>
      </Header>
      <TotalBookings>
        Boookings (30)
      </TotalBookings>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {selectedOption}
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
        <DownIcon />
      </DropdownContainer>
      <CreateBtn>Create</CreateBtn>
      <DeleteBtn>Delete</DeleteBtn>
    </Page>
  )
}

export default ManageBookings;