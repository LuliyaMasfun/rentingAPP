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

/* HEADER */
const HeaderContainter = styled.div`
  position: absolute;
  height: 305px;
  width: 390px;
  background-color: #F8F360;
  margin:0;
`;
const HeaderContent = styled.div`
margin-top:150px;
`;

const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: #3A3B3C;
`;
const EditBtn = styled.button`
position:absolute;
margin-left: 225px;
margin-top: 90px;
margin-right:10px;
width:56px;
height: 26px;
border-radius: 5px;
font-weight: 600;
color: #3A3B3C;
background-color: #EFEFEF;
`;
const SaveBtn = styled.button`
position:absolute;
margin-left: 300px;
margin-top: 90px;
width:56px;
height: 26px;
border-radius: 5px;
font-weight: 600;
color:#EFEFEF;
background-color: #3A3B3C;
`;
const BookedItemHeader = styled.p`
margin-top:-25px;
position:absolute;
margin-left: 35px;
font-weight: 600;
font-size: 16px;
color: #3A3B3C;
`;

const BookingNumberHeader = styled.p`
margin-left: 35px;
font-size: 16px;
color: #3A3B3C;
`;
const LblRow = styled.div`
margin-top:20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const DataRow = styled.div`
 display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;
const StartDateHeaderLbl = styled.p`
position:absolute;
margin-right:254px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
`;
const StartDateHeader = styled.p`
position:absolute;
margin-right:250px;
font-size: 14px;
color: #3A3B3C;
`;
const EndDateHeaderLbl = styled.p`
position:absolute;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
`;
const EndDateHeader = styled.p`
position:absolute;
margin-left:10px;
font-size: 14px;
color: #3A3B3C;
`;
const StatusHeaderLbl = styled.p`
margin-left:254px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
`;
const StatusHeader = styled.p`
margin-left:272px;
font-size: 14px;
color: #3A3B3C;
`
const Meny = styled.div`
  margin-left: 35px;
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const GeneralInfo = styled.button`
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
`;
const User = styled.button`
margin-left: 25px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;
`;
const Rental = styled.button`
margin-left: 25px;
font-size: 14px;
font-weight: 500;
color: #3A3B3C;

`;
const SelectedIndicator = styled.div`
margin-left: 35px;
height: 2px;
width: 78px;
background-color: #3A3B3C;
opacity: 0.7;
border-radius: 1px;
`;

/* GENERAL INF0 GENERAL INF0 GENERAL INF0 GENERAL INF0 GENERAL INF0*/
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 340px;
  `;
const RowBookingNumber = styled.div`
  flex-direction: row;
  color: #EFEFEF;
  width: 320px;
  `;
const BookingNumberLbl = styled.p`
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const BookingNumber = styled.p`
  color: #EFEFEF;
   text-align: right;
   margin-top: -20px;
  `;
const BorderRow1 = styled.hr`
  margin-top: 10px;
  position: absolute;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowName = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const NameLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  
  `;
const Name = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow2 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowBookingType = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width:320px;
  `;
const BookingTypeLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const BookingType = styled.p`
   margin-left: 240px;
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow3 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowRequestedRental = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const RequestedRentalLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const RequestedRental = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow4 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowStartDate = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const StartDateLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const StartDate = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow5 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowEndDate = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const EndDateLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const EndDate = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow6 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowTotalTime = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const TotalTimeLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const TotalTime = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow7 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowCreatedOn = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const CreatedOnLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const CreatedOn = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow8 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const RowStatus = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const StatusLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const Status = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const BorderRow9 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;

/* USER USER USER USER USER USER USER USER USER USER USER */
const UserRowName = styled.div`
  flex-direction: row;
  margin-top: 40vh;
  width: 320px;
`;
const RowNumber = styled.div`
  flex-direction: row;
  margin-top: 30px;
  width: 320px;
  `;
const NumberLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const Number = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;

const RowEmail = styled.div`
  flex-direction: row;
  margin-top: 30px;
  color: #EFEFEF;
  width: 320px;
  `;
const EmailLbl = styled.p`
  position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
  `;
const Email = styled.p`
  color: #EFEFEF;
  text-align: right;
  `;
const UserBorderRow2 = styled.hr`
  position: absolute;
  margin-top: 10px;
  height: 1px;
  width: 390px;
  background-color: #3A3B3C;
  opacity: 0.7;
`;
const Row1 = styled.div`
  flex-direction: row;
  margin-top: 40vh;
  width: 320px;
`;
const RowLbl = styled.p`
 position: absolute;
  margin-left: 35px;
  font-weight: 500;
  color: #EFEFEF;
`;
const DataLbl = styled.p`
text-align: right;
color: #EFEFEF;
`;
const Row2 = styled.div`
  width: 320px;
  flex-direction: row;
  margin-top: 30px;
`;
const Row3 = styled.div`
    margin-top: 30px;
  flex-direction: row;
    width: 320px;
`;
const Row4 = styled.div`
  flex-direction: row;
  margin-top: 30px;
    width: 320px;
`;
const Row5 = styled.div`
  flex-direction: row;
  margin-top: 30px;
    width: 320px;
`;

function BookingDetails() {
  let [data, setData] = useState([])
  const [selectedMenu, setSelectedMenu] = useState('GeneralInfo');
  const [hubNames, setHubNames] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookings/hubBooking/${id}`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchHubNames = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/hubNames?ids=${id}`);
        if (Array.isArray(response.data)) {
          const hubNamesMap = response.data.reduce((map, hub) => {
            map[hub.id] = hub.hubName;
            return map;
          }, {});
          setHubNames(hubNamesMap);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHubNames();
  }, [data, id]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/userInfo?ids=${id}`);
        if (Array.isArray(response.data)) {
          const userInfoMap = response.data.reduce((map, userInfo) => {
            map[data.user.id] = userInfo;
            return map;
          }, {});
          setUserInfo(userInfoMap);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [data]);

  function handleMenuClick(menuOption) {
    setSelectedMenu(menuOption);
  }


  /* HEADER */
  function HeaderBookingDetails() {
    return (
      <div>
        {data ? (
          <HeaderContainter>
            <PageTitle>Booking Details</PageTitle>
            <EditBtn>Edit</EditBtn> <SaveBtn>Save</SaveBtn>

            <HeaderContent>
              <BookedItemHeader>{data?.hub?.hubName}</BookedItemHeader>
              <BookingNumberHeader>{data.bookingNumber}</BookingNumberHeader>

              <LblRow>
                <StartDateHeaderLbl>Start Date</StartDateHeaderLbl>
                <EndDateHeaderLbl>End Date</EndDateHeaderLbl>
                <StatusHeaderLbl>Status</StatusHeaderLbl>
              </LblRow>

              <DataRow>
                <StartDateHeader>{data.startDate}</StartDateHeader>
                <EndDateHeader>{data.endDate}</EndDateHeader>
                <StatusHeader>{data.bookingStatus}</StatusHeader>
              </DataRow>

              <Meny>
                <GeneralInfo onClick={() => handleMenuClick('GeneralInfo')}
                  selected={selectedMenu === 'GeneralInfo'}>GeneralInfo</GeneralInfo>
                <User onClick={() => handleMenuClick('User')}
                  selected={selectedMenu === 'User'}>User</User>
                <Rental onClick={() => handleMenuClick('Rental')}
                  selected={selectedMenu === 'Rental'}>Rental</Rental>
              </Meny>
              {selectedMenu === 'GeneralInfo' && (
                <SelectedIndicator />
              )}

              {selectedMenu === 'User' && (
                <SelectedIndicator style={{ marginLeft: '136px', width: '33px' }} />
              )}

              {selectedMenu === 'Rental' && (
                <SelectedIndicator style={{ marginLeft: '192px', width: '45px' }} />
              )}
            </HeaderContent>
          </HeaderContainter>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )

  }

  /* GENERAL INFO */
  function GeneralInfoTab() {

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const diffInMs = Math.abs(startDate.getTime() - endDate.getTime());
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (data.length > 13) {
      data = data.substr(0, 13) + '\n' + data.substr(13);
    }
    return (
      <Container>
        {data ? (

          <div>
            <RowBookingNumber>
              <BookingNumberLbl>Booking Number</BookingNumberLbl>
              <BookingNumber>{data.bookingNumber}</BookingNumber>
              <BorderRow1 />
            </RowBookingNumber>
            <RowName>
              <NameLbl>Name</NameLbl>
              <Name>{data?.user?.firstName} {data?.user?.lastName}</Name>
              <BorderRow2 />
            </RowName>

            <RowBookingType>
              <BookingTypeLbl>Booking Type</BookingTypeLbl>
              <BookingType>{data?.hub?.rentalType}</BookingType>
              <BorderRow3 />
            </RowBookingType>

            <RowRequestedRental>
              <RequestedRentalLbl>Requested Rental</RequestedRentalLbl>
              <RequestedRental>{data?.hub?.hubName.length > 10
                ? `${data?.hub?.hubName.substr(0,)}\n${data?.hub?.hubName.substr(data.hub.hubName.length)}`
                : data?.hub?.hubName}</RequestedRental>
              <BorderRow4 />
            </RowRequestedRental>

            <RowStartDate>
              <StartDateLbl>Start Date</StartDateLbl>
              <StartDate>{data.startDate}</StartDate>
              <BorderRow5 />
            </RowStartDate>

            <RowEndDate>
              <EndDateLbl>End Date</EndDateLbl>
              <EndDate>{data.endDate}</EndDate>
              <BorderRow6 />
            </RowEndDate>

            <RowTotalTime>
              <TotalTimeLbl>Total Time Requested</TotalTimeLbl>
              <TotalTime>{diffInMs}</TotalTime>
              <BorderRow7 />
            </RowTotalTime>

            <RowCreatedOn>
              <CreatedOnLbl>Created On</CreatedOnLbl>
              <CreatedOn>{data.createdOn}</CreatedOn>
              <BorderRow8 />
            </RowCreatedOn>

            <RowStatus>
              <StatusLbl>Status</StatusLbl>
              <Status>{data.bookingStatus}</Status>

            </RowStatus>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    )
  }

  function UserTab() {
    return (
      <div>
        <UserRowName>
          <NameLbl>Name</NameLbl>
          <Name>{data?.user?.firstName} {data?.user?.lastName}</Name>
          <BorderRow1 />
        </UserRowName>
        <RowEmail>
          <EmailLbl>Email</EmailLbl>
          <Email>{data?.user?.email}</Email>
          <UserBorderRow2 />
        </RowEmail>
        <RowNumber>
          <NumberLbl>Number</NumberLbl>
          <Number>{data?.user?.phoneNumber}</Number>
          <BorderRow3 />
        </RowNumber>
      </div>
    )
  }
  function RentalTab() {
    return (
      <div>
        <Row1>
          <RowLbl>Rental</RowLbl>
          <DataLbl>{data?.hub?.hubName}</DataLbl>
          <BorderRow3 />
        </Row1>
        <Row2>
          <RowLbl>Rental Status</RowLbl>
          <DataLbl>{data?.hub?.rentalStatus}</DataLbl>
          <BorderRow3 />
        </Row2>
        <Row3>
          <RowLbl>Rental Type</RowLbl>
          <DataLbl>{data?.hub?.rentalType}</DataLbl>
          <BorderRow3 />
        </Row3>
        <Row4>
          <RowLbl>Maximum Time to Rent</RowLbl>
          <DataLbl>{data?.hub?.maxTimeToRent} h</DataLbl>
          <BorderRow3 />
        </Row4>
        <Row5>
          <RowLbl>Location</RowLbl>
          <DataLbl>{data?.hub?.hubLocation}</DataLbl>
          <BorderRow3 />
        </Row5>
      </div>
    )
  }

  return (
    <Page>
      <HeaderBookingDetails />
      {selectedMenu === 'GeneralInfo' && (
        <GeneralInfoTab />
      )}
      {selectedMenu === 'User' && (
        <UserTab />
      )}
      {selectedMenu === 'Rental' && (
        <RentalTab />
      )}
    </Page>
  )
}
export default BookingDetails;
