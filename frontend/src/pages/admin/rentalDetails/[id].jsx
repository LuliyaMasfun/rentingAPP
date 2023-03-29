import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import axios from "axios";
import HeaderRentalDetails from "../../../components/HeaderRentalDetails";

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

  /*useEffect(() => {
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
*/


  /* HUB RENTAL DETAILS */
  function HubRental() {
    const [selectedMenu, setSelectedMenu] = useState('GeneralInfo');
    function handleMenuClick(menuOption) {
      setSelectedMenu(menuOption);
    }
    return (
      <div>
        {data ? (
          <div>
            <Page>
              <RentalHubNameRow>
                <HubNameLbl>Rental Name</HubNameLbl>
                <HubName>{data.hubName}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Rental Type</HubNameLbl>
                <HubName>{data.rentalType}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>EAN13 Nr</HubNameLbl>
                <HubName>NaN</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Available to Rent</HubNameLbl>
                <HubName>True / False</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Maximum Time to Rent</HubNameLbl>
                <HubName>{data.maxTimeToRent} h</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Location</HubNameLbl>
                <HubName>{data.hubLocation}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Maximum Time to Rent</HubNameLbl>
                <HubName>{data.hubDescription}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Rental Image</HubNameLbl>
                <HubName>{data.hubImg}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Created By</HubNameLbl>
                <HubName>NaN</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Created On</HubNameLbl>
                <HubName>NaN</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Updated By</HubNameLbl>
                <HubName>NaN</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
              <RentalHubNameRow>
                <HubNameLbl>Updated On</HubNameLbl>
                <HubName>NaN</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
            </Page>

          </div>
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
      <HeaderRentalDetails />
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