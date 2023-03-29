import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import axios from "axios";

const Page = styled.div`
  position: absolute;
  height: 1080px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

/* HUB RENTAL DETAILS */
const RentalHubNameRow = styled.div`
  flex-direction: row;
  margin-top: 30px;
  width: 320px;
`;
const HubNameLbl = styled.p`
 position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
`;
const HubName = styled.p`
color: #EFEFEF;
text-align: right;
`;
const HubNameBorder = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;

function ThisRental() {
  let [data, setData] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/getThisHub/${id}`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/equipment/getEquipment/${id}`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const getRentalComponent = () => {
    if (data && data.rentalType === "HUB") {
      return HubRental;
    } else if (data && data.rentalType === "EQUIPMENT") {
      return EquipmentRental;
    } else if (data && data.rentalType === "EVENT") {
      return EventRental;
    } else {
      return null;
    }
  };

  /* HUB RENTAL DETAILS */
  function HubRental() {
    return (
      <div>
        {data ? (
          <Page>
            <RentalHubNameRow>
              <HubNameLbl>Rental Name</HubNameLbl>
              <HubName>{data.hubName}</HubName>
              <HubNameBorder />
            </RentalHubNameRow>
          </Page>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  function EquipmentRental() {
    return (
      <div>
        {data ? (
          <Page>
            <h1>{data.equipmentName}</h1>
            <h1>HELLOO FROM EQUIPMENT PAGE</h1>
          </Page>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
  function Event() {
    return (
      <div>
        {data ? (
          <Page>
            <h1>HELLO FROM EVENT PAGE</h1>
          </Page>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  return (
    <div>
      {data ? (
        <>
          {data.rentalType === "HUB" && (
            <HubRental />
          )}
          {data.rentalType === "EQUIPMENT" && (
            <EquipmentRental />
          )}
          {data.rentalType === "EVENT" && (
            <Event />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default ThisRental;