import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";

const Page = styled.div`
  position: absolute;
  height: auto;
  padding-bottom: 50px;
  width: 390px;
  background-color: #1e1e1e;
`;

const SubHeaderContainer = styled.div`
  flex-direction: row;
  margin-bottom: 20px;
`;
const SeperationBorder = styled.div`
  position: absolute;
  margin-left: 14vh;
  width: 8px;
  height: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const DropdownContainer = styled.div`
  position: absolute;
  margin-left: 16vh;
`;
const Select = styled.select`
  width: 80px;
  height: 20px;
  background-color: transparent;
  color: #efefef;
  font-size: 16px;
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

const CreateBtn = styled.p`
  position: absolute;
  margin-left: 31vh;
  font-size: 14px;
  color: #f8f360;
`;
const DeleteBtn = styled.button`
  position: absolute;
  margin-left: 37vh;
  font-size: 14px;
  color: #f8f360;
`;
const TotalBookings = styled.div`
  position: absolute;
  margin-left: 33px;
  font-size: 16px;
  color: #efefef;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  margin-left: 32px;
  border-radius: 10px;
  width: 323px;
  height: 162px;
  background-color: #393939;
  margin-top: 30px;
`;
const RentalNameRow = styled.div`
  flex-direction: row;
  width: 270px;
  margin-top: 40px;
`;

const RentalNameLbl = styled.p`
  position: absolute;
  font-weight: 500;
  color: #efefef;
  font-size: 14px;
  margin-left: 25px;
`;

const RentalName = styled.p`
  color: #efefef;
  font-size: 14px;
  float: right;
`;

const BorderRow1 = styled.div`
  position: absolute;
  margin-top: 25px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #efefef;
  opacity: 0.7;
  border-radius: 10px;
`;

const BorderRow2 = styled.div`
  position: absolute;
  margin-top: 65px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #efefef;
  opacity: 0.7;
  border-radius: 10px;
`;

const BorderRow3 = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #efefef;
  opacity: 0.7;
  border-radius: 10px;
`;
const RentalTypeRow = styled.div`
  position: absolute;
  flex-direction: row;
  margin-top: 30px;
  width: 270px;
`;
const RentalTypeLbl = styled.p`
  margin-left: 25px;
  font-weight: 500;
  font-size: 14px;
  color: #efefef;
  margin-top: 10px;
`;
const RentalType = styled.p`
  float: right;
  color: #efefef;
  font-size: 14px;
  text-align: right;
  margin-top: -20px;
`;
const EanNrRow = styled.div`
  position: absolute;
  flex-direction: row;
  margin-top: 75px;
  width: 270px;
`;
const EanNrLbl = styled.p`
  position: absolute;
  margin-left: 25px;
  font-weight: 500;
  font-size: 14px;
  color: #efefef;
`;
const EanNr = styled.p`
  margin-left: 165px;
  color: #efefef;
  font-size: 14px;
  text-align: right;
`;

const NavigateSideIcon = styled(IoChevronForward)`
  position: absolute;
  margin-top: 40px;
  width: 24px;
  height: 24px;
  color: #efefef;
  margin-left: 295px;
`;

const Circle = styled.div`
  position: absolute;
  margin-top: 15px;
  margin-left: 15px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid white;
  &:hover,
  &:active {
    background-color: white;
  }
`;
const DeleteMessageContainer = styled.div`
  width: 280px;
  margin-left: 55px;
  margin-top: 520px;
  position: fixed;
  transition: visibility 0.5s ease-in-out;
`;
const DeleteMessage = styled.p`
  text-align: center;
  font-weight: 600;
  background-color: #f8f360;
  border-radius: 2px;
`;

function RentalCard({ currentValue }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [rentalTypes, setRentalTypes] = useState([]);
  const [selectedRentalType, setSelectedRentalType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRentalTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/rental/getRentalTypes"
        );
        setRentalTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentalTypes();
  }, []);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/rental/getAllRentals"
        );

        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRentals();
  }, []);

  const handleDelete = async (id) => {
    if (isNaN(id)) {
      console.error("Invalid id:", id);
      return;
    }
    if (id == null) {
      console.error("No rental selected");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/rental/deleteRental/${id}`);
      setData(data.filter((rental) => rental.id !== id));
      setSelectedId(null);
      setDeletedMessage(
        `${data.find((rental) => rental.id === id).name} was deleted`
      );
      setTimeout(() => {
        setDeletedMessage(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    if (deletedMessage) {
      setTimeout(() => {
        setDeletedMessage(null);
      }, 3000);
    }
  }, [deletedMessage]);

  const totalNumbersOfRentals = data.length;

  const handleMenyOption = (event) => {
    const selectedRentalType = event.target.value;
    setSelectedRentalType(selectedRentalType);
  };

  return (
    <div>
      <Page>
        <DeleteMessageContainer>
          {deletedMessage && <DeleteMessage>{deletedMessage}</DeleteMessage>}
        </DeleteMessageContainer>
        <SubHeaderContainer>
          <SeperationBorder />
          <TotalBookings>Rentals ({totalNumbersOfRentals})</TotalBookings>
          <DropdownContainer>
            <Select onChange={handleMenyOption} value={selectedRentalType}>
              <option value="">View all</option>
              {rentalTypes.map((rentalType) => (
                <option key={rentalType} value={rentalType}>
                  {rentalType}
                </option>
              ))}
            </Select>
          </DropdownContainer>
          <Link href={{ pathname: "/admin/CreateRental" }}>
            <CreateBtn>Create</CreateBtn>
          </Link>
          <DeleteBtn onClick={() => handleDelete(selected)}>Delete</DeleteBtn>
        </SubHeaderContainer>
        {console.log("detta är nuvarande värde " + currentValue)}

        {data
          .filter((val) => {
            console.log(val.rentalNumber);
            if (currentValue === "") {
              return val;
            } else if (
              val.rentalNumber
                .toLowerCase()
                .includes(currentValue.toLowerCase())
            ) {
              return val;
            }
          })
          .map((rental) => (
            <Container key={rental.id}>
              <CardContainer>
                <Circle
                  onClick={() => handleSelect(rental.id)}
                  selected={selectedId === rental.id}
                />
                <RentalNameRow>
                  <RentalNameLbl>Name</RentalNameLbl>
                  <RentalName>{rental.name}</RentalName>
                </RentalNameRow>
                <BorderRow1 />
                <RentalTypeRow>
                  <RentalTypeLbl>Rental Type</RentalTypeLbl>
                  <RentalType>{rental.rentalType}</RentalType>
                </RentalTypeRow>
                <BorderRow2 />
                <EanNrRow>
                  <EanNrLbl>Ean Nr</EanNrLbl>
                  <EanNr>{rental.ean13}</EanNr>
                  <p className="text-white"> {rental.rentalNumber}</p>
                  <BorderRow3 />
                </EanNrRow>
                <Link
                  href="rentalDetails/[id]"
                  as={`/admin/rentalDetails/${rental.id}`}
                >
                  <NavigateSideIcon />
                </Link>
              </CardContainer>
            </Container>
          ))}
      </Page>
    </div>
  );
}
export default RentalCard;
