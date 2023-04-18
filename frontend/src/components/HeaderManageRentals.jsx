import React from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from 'react-icons/io5';
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { FaBarcode } from "react-icons/fa";
import Link from "next/link";
import RentalCard from "./RentalsCard";


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
height: 200px;
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



const HeaderManageRentals = () => {
  return (

    <div>
      <NavbarAdmin />
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
      </Container>
    </div>
  )

}
export default HeaderManageRentals;