import React from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from 'react-icons/io5';
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaBarcode } from "react-icons/fa";


const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: white;
`;
const Container = styled.div`
position absolute;
height: 230px;
background-color: #1E1E1E;
`;
const HeaderContainer = styled.div`
height: 180px;
background-color: #1E1E1E;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
`;
const SearchOptionsContainer = styled.div`
flex-direction: row;
width: 20px;
`;
const SearchContainer = styled.div`
float: left;
`;
const SearchBar = styled.input`
position:absolute;
margin-left: 95px;
margin-top: 118px;
padding-bottom:2px;
background-color: transparent;
border: 1px solid #EFEFEF;
border-radius: 5px; 
width: 130px; 
height: 25px;
 ::placeholder {
    color: #EFEFEF;
    opacity: 0.4;
    padding:10px;
    font-size: 12px;
  }
`;
const SearchTxt = styled.p`
position: absolute;
margin-top: 120px;
margin-left: 35px;
color: #EFEFEF;
font-size:14px;
`;

const ScanContainer = styled.div`
float: right;
`;
const ScanIcon = styled(FaBarcode)`
position: absolute;
width: 20px;
height: 20px;
margin-top: 121px;
margin-left: 285px;
color: #EFEFEF;
`;

const ScanActionTxt = styled.p`
position: absolute;
margin-top: 120px;
margin-left: 241px;
color: #EFEFEF;
font-size:14px;
`;
const SubHeaderContainer = styled.div`
flex-direction: row;
`;
const SeperationBorder = styled.div`
position: absolute;
margin-left: 14vh;
margin-top: 2.5vh;
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
margin-left: 37vh;
margin-top: 21px;
font-size: 14px;
color: #F8F360;
`;
const TotalBookings = styled.div`
position: absolute;
margin-top: 20px;
margin-left:33px;
font-size: 16px;
color: #EFEFEF;
`;


const HeaderManageRentals = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/hub/getAllHubs");
        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const options = [
    "View All",
    "Pending",
    "Rejected",
    "Approved",

  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const totalNumbersOfRentals = data.length;
  return (
    <div>
      <Navbar />
      <PageTitle>Manage Rentals</PageTitle>
      <Container>
        <HeaderContainer>
          <SearchOptionsContainer>
            <SearchContainer>
              <SearchBar
                placeholder="Rental number"
              //onChange={ }
              ></SearchBar>
              <SearchTxt>Search: </SearchTxt>
            </SearchContainer>
            <ScanContainer>
              <ScanActionTxt>Scan: </ScanActionTxt>
              <ScanIcon />
            </ScanContainer>
          </SearchOptionsContainer>
        </HeaderContainer>
        <SeperationBorder />
        <SubHeaderContainer>
          <TotalBookings>
            Rentals ({totalNumbersOfRentals})
          </TotalBookings>
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
          <CreateBtn>Create</CreateBtn>
          <DeleteBtn>Delete</DeleteBtn>
        </SubHeaderContainer>
      </Container>
    </div>
  )
}
export default HeaderManageRentals;