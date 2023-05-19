import React from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from "react-icons/io5";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
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
  /* position:absolute; */
  height: 200px;
  background-color: #1e1e1e;
`;
const HeaderContainer = styled.div`
  height: 180px;
  background-color: #1e1e1e;
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
  position: absolute;
  margin-left: 95px;
  margin-top: 118px;
  padding-bottom: 2px;
  background-color: transparent;
  border: 1px solid #efefef;
  border-radius: 5px;
  width: 130px;
  height: 25px;
  color:white ::placeholder {
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
  color: #efefef;
  font-size: 14px;
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
  color: #efefef;
`;

const ScanActionTxt = styled.p`
  position: absolute;
  margin-top: 120px;
  margin-left: 241px;
  color: #efefef;
  font-size: 14px;
`;

const HeaderManageRentals = ({ onCurrentValueChange }) => {
  const handleInputChange = (e) => {
    let value = e.target.value;
    // setCurrentValue(value);
    onCurrentValueChange(value);
  };
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
                onChange={handleInputChange}
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
  );
};
export default HeaderManageRentals;
