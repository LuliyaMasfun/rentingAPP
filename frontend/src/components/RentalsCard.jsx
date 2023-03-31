import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from 'react-icons/io5';
import Link from "next/link";

const Page = styled.div`
  position: absolute;
  height: auto;
  padding-bottom: 50px;
  width: 390px;
  background-color: #1E1E1E;
`;
const Container = styled.div`
display: flex;
flex-direction: column;

`;
const CardContainer = styled.div`
margin-left:32px;
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
color: #EFEFEF;
font-size: 14px;
margin-left: 25px;

  `;

const RentalName = styled.p`
  color: #EFEFEF;
  font-size: 14px;
  float: right;

  `;

const BorderRow1 = styled.div`
position: absolute;
  margin-top: 25px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #EFEFEF;
  opacity: 0.7;
  border-radius: 10px;
`;

const BorderRow2 = styled.div`
position: absolute;
  margin-top: 65px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #EFEFEF;
  opacity: 0.7;
    border-radius: 10px;
`;

const BorderRow3 = styled.div`
position: absolute;
  margin-top: 5px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #EFEFEF;
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
color: #EFEFEF;
margin-top: 10px;
`;
const RentalType = styled.p`
float: right;
  color: #EFEFEF;
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
color: #EFEFEF;
`;
const EanNr = styled.p`
 margin-left: 165px;
  color: #EFEFEF;
  font-size: 14px;
  text-align: right;
  `;

const NavigateSideIcon = styled(IoChevronForward)`
position: absolute;
margin-top: 40px;
width: 24px;
height: 24px;
color: #EFEFEF;
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
const DeleteBtn = styled.button`
position: absolute;
margin-left: 37vh;
margin-top: 21px;
font-size: 14px;
color: #F8F360;
`;

function RentalCard() {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/getAllHubs`);
        console.log(response.data);
        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <div>
      <Page>

        {data.map((rental) => (
          <Container key={rental.id}>
            <CardContainer>
              <Circle onClick={() => {
                setSelected(!selected);
                setSelectedId(rental.id);
              }} selected={selected} />
              <RentalNameRow>
                <RentalNameLbl>Name</RentalNameLbl>
                <RentalName>{rental.hubName}</RentalName>
              </RentalNameRow>
              <BorderRow1 />
              <RentalTypeRow>
                <RentalTypeLbl>Rental Type</RentalTypeLbl>
                <RentalType>{rental.rentalType}</RentalType>
              </RentalTypeRow>
              <BorderRow2 />
              <EanNrRow>
                <EanNrLbl>Ean Nr</EanNrLbl>
                <EanNr>NaN</EanNr>
                <BorderRow3 />
              </EanNrRow>
              <Link href="rentalDetails/[id]" as={`/admin/rentalDetails/${rental.id}`}>
                <NavigateSideIcon />
              </Link>
            </CardContainer>
          </Container>

        ))
        }
      </Page>
    </div>
  )
}
export default RentalCard;