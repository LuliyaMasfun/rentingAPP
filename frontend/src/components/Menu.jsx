import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";


const BackgroundContainer = styled.div`
position: absolute;
background-color: #F3F3F3;
height: 844px;
width: 195px;
margin-top: 55px;
border-radius: 5px;
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