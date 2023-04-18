import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import axios from "axios";
import diagonalYellow from "../../../../public/squareDigonal.png"
import Image from "next/image";
import podcast from '../../../../public/podcast2.png'
import coWorking from '../../../../public/coWorking2.png'
import film from '../../../../public/film2.png'

const Page = styled.div`
  position: absolute;
  height: 1080px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

/* HEADER */
const HeaderContainer = styled.div`
height: 235px;
background-color: #F8F360;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
width: 390px;
`;
const EquipmentImage = styled(Image)`
position: absolute;
margin-top: 90px;
margin-left: 35px;
width: 35%;
`;
const YellowDiagonal = styled(Image)`
float: right;
`;
const EditBtn = styled.button`
position:absolute;
margin-left: 285px;
margin-top: 30px;
width:56px;
height: 26px;
border-radius: 5px;
font-weight: 600;
color: #3A3B3C;
background-color: #EFEFEF;
`;
const TitleContainer = styled.div`
flex-direction: column;
height: 80px;
width: 200px;
margin-left: 35px;
`;
const TitleName = styled.p`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 30px;
color: #3A3B3C;
float: right;
`;
const RentalNumber = styled.p`
position: absolute;
float: right;
margin-top: 60px;
`;
const Meny = styled.div`
position: absolute;
  margin-left: 35px;
  margin-top: 120px;
  width: 220px;
  heigth: 30px;
`;
const GeneralInfo = styled.button`
font-size: 14px;
font-weight: 500;
color: #3A3B3C;

`;
const Bookings = styled.button`
float: right;
margin-top: 2px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
font-weight: 400;
`;
const SelectedIndicator = styled.div`
height: 2px;
width: 132px;
background-color: #3A3B3C;
border-radius: 1px;
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
const HubDescLbl = styled.p`
 position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  width: 120px;
`;
const HubDesc = styled.p`
color: #EFEFEF;
width: 150px;
margin-left: 178px;
`;

/* BOOKING DETAILS */
const RentalBookingRow = styled.div`
 flex-direction: row;
  margin-top: 30px;
  width: 320px;
`;
const BookingBorder = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const BookingData = styled.p`
color: #EFEFEF;
text-align: right;
`;
const BookingLbl = styled.p`
 position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
`;


function ThisRental() {
  let [data, setData] = useState([])
  const [selectedMenu, setSelectedMenu] = useState('GeneralInfo');
  const [bookingInfo, setBookingInfo] = useState({});
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
    const fetchBookingInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/bookingsInfo?id=${id}`);
        console.log(response.data)
        setBookingInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookingInfo();
  }, [data]);


  function handleMenuClick(menuOption) {
    setSelectedMenu(menuOption);
  }


  function Header() {
    const checkType = (imageType) => {
      if (imageType.hubName == "The Podcast Studio") {
        return podcast;
      } else if (imageType.hubName == "The Film Studio") {
        return film;
      } else {
        return coWorking;
      }
    }
    function handleEdit() {
      console.log(id);
      router.push(`/admin/editRental/${id}`);
    }

    return (
      <div>
        <HeaderContainer>
          <EquipmentImage src={checkType(data)} />
          <YellowDiagonal src={diagonalYellow} />
          <EditBtn onClick={handleEdit}>Edit</EditBtn>
          <TitleContainer>
            <TitleName>{data.hubName}</TitleName>
            <RentalNumber>1234567891234</RentalNumber>
          </TitleContainer>
          <Meny>
            <GeneralInfo onClick={() => handleMenuClick('GeneralInfo')}
              selected={selectedMenu === 'GeneralInfo'}>General Information</GeneralInfo>
            <Bookings onClick={() => handleMenuClick('Bookings')}
              selected={selectedMenu === 'Bookings'}>Bookings</Bookings>

            {selectedMenu === 'GeneralInfo' && (
              <SelectedIndicator />
            )}
            {selectedMenu === 'Bookings' && (
              <SelectedIndicator style={{ marginLeft: '158px', width: '63px' }} />
            )}
          </Meny>
        </HeaderContainer>
      </div>
    )
  }
  function GeneralInfoTab() {
    return (
      <div>
        {data ? (
          <div>
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
              <HubDescLbl>Description</HubDescLbl>
              <HubDesc>{data.hubDescription}</HubDesc>
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

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  //MAPPA IGENOM BOKNINGAR SOM FINNS PÅ RENTAL, KOLLA PÅ DATAN I CONSOLE LOG. INDEX ÄR HUB ID..?
  function BookingsTab() {
    return (
      <div>
        {data ? (
          Object.keys(bookingInfo).map(bookingId => (
            <div key={bookingId}>
              <RentalBookingRow>
                <BookingLbl>Booking number</BookingLbl>
                <BookingData>{bookingInfo[bookingId].bookingNumber}</BookingData>
                <BookingLbl>Created on</BookingLbl>
                <BookingData>{new Date(bookingInfo[bookingId].createdOn).toLocaleDateString()}</BookingData>
                <BookingLbl>User</BookingLbl>
                <BookingData>{bookingInfo[bookingId].userFirstName} {bookingInfo[bookingId].userLastName} </BookingData>
                <BookingLbl>Booking status</BookingLbl>
                <BookingData>{bookingInfo[bookingId].bookingStatus}</BookingData>
                <BookingLbl>Start date</BookingLbl>
                <BookingData>{bookingInfo[bookingId].startDate}</BookingData>
                <BookingLbl>End date</BookingLbl>
                <BookingData>{bookingInfo[bookingId].endDate}</BookingData>
                <BookingBorder />
              </RentalBookingRow>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <Page>
        <Header />
        {selectedMenu === 'GeneralInfo' && (
          <GeneralInfoTab />
        )}
        {selectedMenu === 'Bookings' && (
          <BookingsTab />
        )}
      </Page>
    </div>
  )
}

export default ThisRental;