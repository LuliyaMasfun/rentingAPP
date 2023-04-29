import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import axios from "axios";
import diagonalYellow from "../../../../public/squareDigonal.png"
import Image from "next/image";
import podcast from '../../../../public/podcast2.png'
import coWorking from '../../../../public/coWorking2.png'
import film from '../../../../public/film2.png'
import light from "../../../../public/aputure.png";
import sound from "../../../../public/rode.png";
import camera from "../../../../public/canon.png";

const Page = styled.div`
  position: absolute;
  height: 1380px;
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
color: #EFEFEF;
background-color: #1E1E1E;
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
const HubDesc = styled.p`
color: #EFEFEF;
width: 150px;
margin-left: 200px;
`;
const RentalImage = styled(Image)`
float: right;
width: 18%;
margin-top: -35px;
`;
const Row = styled.div`
  flex-direction: row;
  margin-top: 30px;
  width: 320px;
`;
const Lbl = styled.p`
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
`;
const Data = styled.p`
color: #EFEFEF;
text-align: right;

`;
const Border = styled.hr`
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
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
        const response = await axios.get(`http://localhost:8080/rental/getThisRental/${id}`);
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
        const response = await axios.get(`http://localhost:8080/rental/bookingsInfo?id=${id}`);
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
      if (data.rentalType === "HUB") {
        if (imageType.hubType == "PODCASTSTUDIO") {
          return podcast;
        } else if (imageType.hubType == "MUSICSTUDIO") {
          return podcast;
        } else if (imageType.hubType == "FILMSTUDIO") {
          return film;
        } else if (imageType.hubType == "COWORKING") {
          return coWorking;
        }
      } else if (data.rentalType === "EQUIPMENT") {
        if (imageType.equipmentType == "CAMERA") {
          return camera;
        } else if (imageType.equipmentType == "SOUND") {
          return sound;
        } else if (imageType.equipmentType == "LIGHT") {
          return light;
        }
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
            <TitleName>{data.name}</TitleName>
            <RentalNumber>{data.rentalNumber}</RentalNumber>
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

    const checkType = (imageType) => {
      if (data.rentalType === "HUB") {
        if (imageType.hubType == "PODCASTSTUDIO") {
          return podcast;
        } else if (imageType.hubType == "MUSICSTUDIO") {
          return podcast;
        } else if (imageType.hubType == "FILMSTUDIO") {
          return film;
        } else if (imageType.hubType == "COWORKING") {
          return coWorking;
        }
      } else if (data.rentalType === "EQUIPMENT") {
        if (imageType.equipmentType == "CAMERA") {
          return camera;
        } else if (imageType.equipmentType == "SOUND") {
          return sound;
        } else if (imageType.equipmentType == "LIGHT") {
          return light;
        }
      }
    }

    return (
      <div>
        {data ? (
          <div>
            <RentalHubNameRow>
              <HubNameLbl>Rental Name</HubNameLbl>
              <HubName>{data ? data.name : "NaN"}</HubName>
              <HubNameBorder />
            </RentalHubNameRow>
            <RentalHubNameRow>
              <HubNameLbl>Rental Type</HubNameLbl>
              <HubName>{data ? data.rentalType : "NaN"}</HubName>
              <HubNameBorder />
            </RentalHubNameRow>
            <RentalHubNameRow>
              <HubNameLbl>EAN13 Nr</HubNameLbl>
              <HubName>{data ? data.ean13 : "NaN"}</HubName>
              <HubNameBorder />
            </RentalHubNameRow>

            {data?.rentalType === "HUB" && (
              <RentalHubNameRow>
                <HubNameLbl>Hub Type</HubNameLbl>
                <HubName>{data ? data.hubType : "NaN"}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
            )}

            {data?.rentalType === "EQUIPMENT" && (
              <RentalHubNameRow>
                <HubNameLbl>Equipment Type</HubNameLbl>
                <HubName>{data ? data.equipmentType : "NaN"}</HubName>
                <HubNameBorder />
              </RentalHubNameRow>
            )}
            <RentalHubNameRow>
              <HubNameLbl>Maximum Time to Rent</HubNameLbl>
              <HubName>{data ? data.maxTimeToRent : "NaN"} h</HubName>
              <HubNameBorder />
            </RentalHubNameRow>
            <RentalHubNameRow>
              <HubNameLbl>Location</HubNameLbl>
              <HubName>{data ? data.location : "NaN"}</HubName>
              <HubNameBorder />
            </RentalHubNameRow>
            <Row>
              <Lbl>Description</Lbl>
              <HubDesc>{data ? data.description : "NaN"}</HubDesc>
              <Border />
            </Row>
            <Row>
              <Lbl>Rental Image</Lbl>
              <RentalImage src={checkType(data)}></RentalImage>
              <Border />
            </Row>
            {data?.rentalType === "HUB" && (
              <Row>
                <Lbl>Max Amount Of People</Lbl>
                <Data>{data ? data.maxAmountOfPeople : "NaN"}</Data>
                <Border />
              </Row>
            )}
            {data?.rentalType === "EQUIPMENT" && (
              <Row>
                <Lbl>Brand</Lbl>
                <Data>{data ? data.brand : "NaN"}</Data>
                <Border />
              </Row>
            )}
            <Row>
              <Lbl>Created By</Lbl>
              <Data>{data ? data.createdBy : "NaN"}</Data>
              <Border />
            </Row>
            <Row>
              <Lbl>Created On</Lbl>
              <Data>{data ? data.createdOn : "NaN"}</Data>
              <Border />
            </Row>
            <Row>
              <Lbl>Updated By</Lbl>
              <Data>{data ? data.updatedBy : "NaN"}</Data>
              <Border />
            </Row>
            <Row>
              <Lbl>Updated On</Lbl>
              <Data>{data ? data.updatedOn : "NaN"}</Data>
              <Border />
            </Row>
            <Row>
              <Lbl>Available to Rent</Lbl>
              <Data>{data ? data.availableToRent : "NaN"}</Data>
              <Border />
            </Row>

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