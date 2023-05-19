import React from "react";
import HeaderManageRentals from "../../components/HeaderManageRentals";
import RentalCard from "../../components/RentalsCard";
import { useState } from "react";

function ManageRentals() {
  const [currentValue, setCurrentValue] = useState("");

  const handleCurrentValueChange = (value) => {
    setCurrentValue(value);
  };
  return (
    <div>
      <HeaderManageRentals onCurrentValueChange={handleCurrentValueChange} />
      <RentalCard currentValue={currentValue} />
    </div>
  );
}
export default ManageRentals;
