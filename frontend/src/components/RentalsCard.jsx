import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from 'react-icons/io5';
import Link from "next/link";

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
  flex-direction: row;
  margin-top: 30px;
  width: 270px;
  `;

const RentalNameLbl = styled.p`
position: absolute;
margin-left: 25px;
font-weight: 500;
color: #EFEFEF;
font-size: 14px;
  `;

const RentalName = styled.p`
  color: #EFEFEF;
  font-size: 14px;
    width: 127px;
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
`;

const BorderRow2 = styled.div`
position: absolute;
  margin-top: 5px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #EFEFEF;
  opacity: 0.7;
`;

const BorderRow3 = styled.div`
  margin-top: 5px;
  margin-left: 17px;
  height: 1px;
  width: 270px;
  background-color: #EFEFEF;
  opacity: 0.7;
`;
const RentalTypeRow = styled.div`
  flex-direction: row;
  margin-top: 10px;
width: 270px;
`;
const RentalTypeLbl = styled.p`
margin-left: 25px;
font-weight: 500;
font-size: 14px;
color: #EFEFEF;


`;
const RentalType = styled.p`
 margin-left: 165px;
  color: #EFEFEF;
  font-size: 14px;
  text-align: right;
  
  `;
const EanNrRow = styled.div`
  flex-direction: row;
  margin-top: 15px;
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
float: right;
margin-top: 20px;
width: 24px;
height: 24px;
color: #EFEFEF;

`;

function RentalCard() {

  const [data, setData] = useState([]);

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

  return (
    <div>
      {data.map((data) => (
        <div key={data.id}>
          <CardContainer>
            <RentalNameRow>
              <RentalNameLbl>Name</RentalNameLbl>
              <RentalName>{data.hubName}</RentalName>
              <BorderRow1 />
            </RentalNameRow>
            <Link href="rentalDetails/[id]" as={`/admin/rentalDetails/${data.id}`}>
              <NavigateSideIcon />
            </Link>
            <RentalTypeRow>
              <RentalTypeLbl>Rental Type</RentalTypeLbl>
              <RentalType>{data.rentalType}</RentalType>
              <BorderRow2 />
            </RentalTypeRow>
            <EanNrRow>
              <EanNrLbl>Ean Nr</EanNrLbl>
              <EanNr>NaN</EanNr>
              <BorderRow3 />
            </EanNrRow>
          </CardContainer>
        </div>

      ))
      }

    </div>
  )
}
export default RentalCard;