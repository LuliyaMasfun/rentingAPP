import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";


const BackgroundContainer = styled.div`
z-index: 1;
position: fixed;
background-color: #F3F3F3;
height: 787px;
width: 195px;
margin-top: 850px;
border-radius: 5px;
margin-left: -190px;
`;
const MyBookingsLbl = styled.p``;
function Menu() {

  return (
    <BackgroundContainer>

      <Link href={"/../user/MyBookings"}>
        <MyBookingsLbl>My Bookings</MyBookingsLbl>
      </Link>
    </BackgroundContainer>
  )
}
export default Menu