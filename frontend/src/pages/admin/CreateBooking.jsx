import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import DropDown from "../../components/DropDown";
import { useRouter } from 'next/router';
import axios from "axios";
import DiagonalImg from "../../../public/greyDiagonal.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';


const Page = styled.div`
  position: absolute;
  height: 900px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;
/* HEADER */
const Header = styled.div`
height: 180px;
background-color: #EFEFEF;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
width: 390px;
`;
const GreyDiagonal = styled(Image)`
float: right;
`;
const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: #3A3B3C;
`;
const CreateIcon = styled(IoCreateOutline)`
position: absolute;
margin-left: 315px;
margin-top: 20px;
width: 44px;
height: 44px;
color: #EFEFEF;
`;

/* INPUTS */
const InputContainer = styled.div`
display: flex;
flex-direction: column;
width: 300px;
height: 550px;
margin-left:35px;
margin-top: 35px;
`;
const RentalContainer = styled.div`
margin-bottom: 23px;
`;
const RentalLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;

const Select = styled.select`
width: 279px;
height: 44px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
opacity: 0.7;
`;
const StartContainer = styled.div`
margin-bottom: 23px;
`;
const DateLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const DatePickerStart = styled(DatePicker)`
width: 279px;
height: 44px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
opacity: 0.7;
::placeholder {
    color: #EFEFEF;
    padding:10px;
    font-weight: 400;
  }
  opacity: 0.7;

`;
const EndContainer = styled.div`
margin-bottom: 23px;
`;
const DatePickerEnd = styled(DatePicker)`
width: 279px;
height: 44px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
opacity: 0.7;
::placeholder {
    color: #EFEFEF;
    padding:10px;
    font-weight: 400;
  }
  opacity: 0.7;
`;
const CreateBtn = styled.button`
margin-left: 95px;

width:202px;
height: 36px;
border-radius: 5px;
font-weight: 600;
color: #3A3B3C;
background-color: #EFEFEF;
`;
const CreateMessageContainer = styled.div`
width: 280px;
margin-left: 55px;
margin-top: 520px;
position: fixed;
transition: visibility 0.5s ease-in-out;
`;
const CreateMessage = styled.p`
text-align: center;
font-weight: 600;
background-color: #F8F360;
border-radius: 2px;
`;



function CreateBooking() {
  const [rentals, setRentals] = useState([]);
  const [selectedRentalId, setSelectedRentalId] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [createdMessage, setCreatedMessage] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:8080/rental/getAllRentals')
      .then(response => setRentals(response.data))
      .catch(error => console.log(error));
  }, []);

  // Handle rental selection
  const handleRentalSelect = (event) => {
    const selectedRentalId = event.target.value;
    setSelectedRentalId(selectedRentalId);
  };

  const handleCreate = () => {
    const data = {
      user: { id: 3 },
      rental: { id: selectedRentalId },
      startDateTime: format(startDateTime, "yyyy-MM-dd:HH:mm"),
      endDateTime: format(endDateTime, "yyyy-MM-dd:HH:mm"),
    };
    console.log(data)

    axios.post('http://localhost:8080/bookingsV2/placeBooking', data)
      .then(response => {
        console.log(response.data);
        setCreatedMessage(`${rentals.name} was booked`);
        setTimeout(() => {
          setCreatedMessage(null);
        }, 3000);
      })
      .catch(error => {
        const errorMessage = error.response.data.message;
        setCreatedMessage(`Booking failed: ${errorMessage}`);
      });
  };

  useEffect(() => {
    if (createdMessage) {
      setTimeout(() => {
        setCreatedMessage(null);
      }, 3000);
    }
  }, [createdMessage]);

  return (
    <Page>
      <CreateMessageContainer>
        {createdMessage && <CreateMessage>{createdMessage}</CreateMessage>}
      </CreateMessageContainer>
      <Header>
        <GreyDiagonal src={DiagonalImg} />
        <PageTitle>Create Booking</PageTitle>
        <CreateIcon />
      </Header>
      <InputContainer>
        <RentalContainer>
          <RentalLbl>Rental</RentalLbl>
          <Select onChange={handleRentalSelect}>
            <option value="">Select a rental</option>
            {rentals.map(rental => (
              <option key={rental.id} value={rental.id}>
                {rental.name}
              </option>
            ))}
          </Select>
        </RentalContainer>

        <StartContainer>
          <DateLbl>Dates</DateLbl>
          <DatePickerStart
            selected={startDateTime}
            onChange={(date) => setStartDateTime(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd : HH:mm"
            placeholderText="Select start date & time"
            className="date-picker"
          />
        </StartContainer>
        <EndContainer>
          <DatePickerEnd
            selected={endDateTime}
            onChange={(date) => setEndDateTime(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd : HH:mm"
            placeholderText="Select end date & time"
            className="date-picker"
          />
        </EndContainer>
      </InputContainer>
      <CreateBtn onClick={handleCreate}>Create</CreateBtn>
    </Page>

  )
}

export default CreateBooking;