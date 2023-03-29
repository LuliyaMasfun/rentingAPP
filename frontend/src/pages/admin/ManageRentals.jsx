import React from "react";
import HeaderManageRentals from "../../components/HeaderManageRentals"
import RentalCard from "../../components/RentalsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";


function ManageRentals() {

  return (
    <div>
      <HeaderManageRentals />
      <RentalCard />
    </div>
  )
}
export default ManageRentals;