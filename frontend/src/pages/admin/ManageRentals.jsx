import React from "react";
import styled from "@emotion/styled";
import Navbar from "../../components/Navbar";
import { IoChevronForward } from 'react-icons/io5';
import { useState, useEffect } from "react";
import axios from "axios";

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
const HeaderContainer = styled.div`
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

const CardContainer = styled.div`
position: absolute;
margin-top: 304px;
margin-left:32px;
border-radius: 10px;
width: 323px;
height: 162px;
background-color: #393939;
`;
const RentalNameRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  `;

const RentalNameLbl = styled.p`
position: absolute;
margin-left: 25px;
font-weight: 500;
color: #EFEFEF;
  `;

const RentalName = styled.p`
 margin-left: 165px;
  color: #EFEFEF;
  `;

const BorderRow1 = styled.div`
  position: absolute;
  margin-top: 35px;
  margin-left: 14px;
  height: 1px;
  width: 277px;
  background-color: #EFEFEF;
  opacity: 0.7;
`;
const RentalTypeRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const RentalTypeLbl = styled.p`
position: absolute;
margin-left: 25px;
font-weight: 500;
color: #EFEFEF;
`;
const RentalType = styled.p`
 margin-left: 165px;
  color: #EFEFEF;
  `;


function ManageRentals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/getAllHubs`);
        console.log("data" + data)
        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  function Header() {
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
      <Page>
        <Navbar />
        <PageTitle>Manage Rentals</PageTitle>
        <HeaderContainer>
          <SearchBar
            placeholder="Rental number"
          //onChange={ }
          ></SearchBar>
          <SearchTxt>Search: </SearchTxt>
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
      </Page>
    )

  }

  function RenalCard() {
    return (
      <div>
        {data.map((booking) => (
          <CardContainer>
            <RentalNameRow>
              <RentalNameLbl>Name</RentalNameLbl>
              <RentalName>{booking.hubName}</RentalName>
              <BorderRow1 />
            </RentalNameRow>

            <RentalTypeRow>
              <RentalTypeLbl>Rental Type</RentalTypeLbl>
              <RentalType>{booking.rentalType}</RentalType>
              <BorderRow1 />
            </RentalTypeRow>



          </CardContainer>

        ))
        }
      </div>
    )
  }


  return (
    <div>
      <Header />
      <RenalCard />
    </div>
  )
}

export default ManageRentals;