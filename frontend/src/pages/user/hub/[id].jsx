import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import styled from '@emotion/styled';
import Image from 'next/image';
import podcast from '../../../../public/podcast2.png'
import coWorking from '../../../../public/coWorking2.png'
import film from '../../../../public/film2.png'
import "../../../styles/globals.css"
import Link from 'next/link';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { TimePicker } from 'antd';
import { getHours, getMinutes, getDay, isWithinInterval, isSameDay } from 'date-fns';
import AuthService from '../../../services/auth.service';

const Page = styled.div`
  position: absolute;
  height: 1384px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

const EquipmentImage = styled(Image)`
`;
const Brand = styled.h2`
positon:absolute;
margin-left: 3vh;
margin-top:2vh;
color: #A86A61;
font-size: 16px;
`;
const Name = styled.h1`
positon:absolute;
margin-left: 3vh;
margin-top:1vh;
color: #FFFFFF;
font-weight: 500;
font-size: 22px;
`;

const LocationBg = styled.div`
position: absolute;
margin-left: 3vh;
margin-top: 2.5vh;
background-color: #323232;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
const Location = styled.p`
position: absolute;
margin-top: 3.2vh;
margin-left: 4.5vh;
font-size: 16px;
color: white;
width: 140px;
`;
const LocationIcon = styled(FaMapMarkerAlt)`
position: absolute;
margin-top: 1.5vh;
margin-left: 2vh;
color: #8E8E8E;
`;
const LocationTxt = styled.p`
position: absolute;
margin-top: 1vh;
margin-left: 4.5vh;
font-size: 14px;
color: #8E8E8E;
`;

const MaxDaysToRentBg = styled.div`
position: absolute;
margin-left: 24vh;
margin-top: 2.5vh;
background-color: #323232;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
const MaxDaysToRent = styled.p`
position: absolute;
margin-top: 3.2vh;
margin-left: 4.5vh;
font-size: 16px;
color: white;
`;
const MaxDaysToRentTxt = styled.p`
position: absolute;
margin-top: 1vh;
margin-left: 4.5vh;
font-size: 14px;
color: #8E8E8E;
`;
const ClockIcon = styled(FaRegClock)`
position: absolute;
margin-top: 1.3vh;
margin-left: 2vh;
color: #8E8E8E;
`;

const DescBg = styled.div`
position: absolute;
margin-top: 12vh;
margin-left: 3vh;
background-color: #F3F3F3;
width: 340px;
height: 185px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
const DescTxt = styled.p`
position: absolute;
margin-top:1vh;
margin-left: 2.4vh;
font-size: 16px;
font-weight:500;

`;
const Description = styled.h2`
position: absolute;
margin-left: 0vh;
margin-top:2vh;
font-size:12px;
color: #AAAAAA;
padding:20px;
`;
const ViewMore = styled.span`
text-decoration: underline;
color: #F18F85;
`;

const MakeReservationBtn = styled.button`
position: absolute;
background-color: #E8E337;
width: 267px;
height: 38px;
margin-top: 110vh;
margin-left: 7vh;
border-radius: 5px;
font-size: 14px;
font-weight: 500;
`;

/* CALENDAR */

const CalendarContainer = styled.div`
position: absolute;
margin-top: 37vh;
margin-left: 3vh;
width: 340px;

.nice-dates-day.-modifiers { color: orange; }
`;
const SelectContainer = styled.div`
display: flex;
flex-direction: row;
width: 340px;
height:65px;
margin-bottom: 3vh;
`;

const SelectStartBg = styled.div`
background-color: #F3F3F3;
position: absolute;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
const SelectEndBg = styled.div`
background-color: #F3F3F3;
position: absolute;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
margin-left: 21vh;
`;

const SelectStartLbl = styled.p`
position: absolute;
color: #323232;
margin-top: 1vh;
margin-left: 3.2vh;
margin-left:3.2vh;
font-size: 14px;
`;

const SelectStartTxt = styled.p`
position: absolute;
color: #1E1E1E;
margin-top: 3vh;
margin-left: 3.2vh;
text-align: center;
`;

const SelectEndLbl = styled.p`
position: absolute;
color: #323232;
margin-top: 1vh;
margin-left: 3.2vh;
margin-left:3.2vh;
font-size: 14px;
`;

const SelectEndTxt = styled.p`
position: absolute;
color: #1E1E1E;
margin-top: 3vh;
text-align: center;
margin-left:3.2vh;
`;
const TimeContainer = styled.div`
display: flex;
flex-direction: row;
width: 340px;
height:65px;
margin-bottom: 3vh;
color: white;
`;
const TimePicker2 = styled(TimePicker.RangePicker)`
background-color: transparent;
border: 1px solid #323232;
width:340px;
height:40px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
text-align: center;
background-color: #F3F3F3;
margin-top: 3vh;
color: yellow !important;
`;
const CreateMessageContainer = styled.div`
width: 280px;
margin-left: 55px;
margin-top: 520px;
position: fixed;
transition: visibility 0.5s ease-in-out;
`;
const CreateMessage = styled.p`
text-align: center;
font-weight: 600;
background-color: #F8F360;
border-radius: 2px;
`;

const EquipmentItem = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  const { id } = router.query
  const [bookings, setBookings] = useState([])
  const [booking, setBooking] = useState([])
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [rentalId, setRentalId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE)
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
  const [createdMessage, setCreatedMessage] = useState(null);

  /* HUB */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rental/getThisRental/${id}`);
        const data = response.data
        setData(data);
        setRentalId(data.id);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);


  const maximumLength = data.maxTimeToRent;

  const handleBooking = async () => {
    const userId = AuthService.getCurrentUser().id;
    const data = {
      user: { id: userId },
      rental: { id: rentalId },
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };
    console.log(data);
    axios.post('http://localhost:8080/bookingsV2/placeBooking', data)
      .then(response => {
        console.log(response.data);
        const rentalName = response.data.rental.name;
        setCreatedMessage(`${rentalName} was booked`);
        setTimeout(() => {
          setCreatedMessage(null);
        }, 3000);
      })
      .catch(error => {

        console.log(error.response.data);

        const errorMessage = error.response.data.message;
        setCreatedMessage(`Booking failed: ${errorMessage}`);
      });
  };
  useEffect(() => {
    if (createdMessage) {
      setTimeout(() => {
        setCreatedMessage(null);
      }, 3000);
    }
  }, [createdMessage]);


  /* CALENDAR */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookingsV2/bookingsOnThisRental/${data.id}`);
        if (response.data.length > 0) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, [data && data.id]);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);


  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleTimeChange = (values) => {
    const [start, end] = values;
    if (start && end) {
      const formattedStartTime = start.format('HH:mm');
      const formattedEndTime = end.format('HH:mm');
      const newStartDate = new Date(startDate);
      const newEndDate = new Date(endDate);
      newStartDate.setHours(formattedStartTime.split(':')[0]);
      newStartDate.setMinutes(formattedStartTime.split(':')[1]);
      newEndDate.setHours(formattedEndTime.split(':')[0]);
      newEndDate.setMinutes(formattedEndTime.split(':')[1]);
      if (isNaN(newStartDate.getTime())) {
        console.error('Invalid date:', newStartDate);
        return;
      }
      const formattedStartDate = `${format(newStartDate, 'yyyy-MM-dd:HH:mm')}`;
      setStartDateTime(formattedStartDate);
      const formattedEndDate = `${format(newEndDate, 'yyyy-MM-dd:HH:mm')}`;
      setEndDateTime(formattedEndDate);
    }
    setStartTime(start);
    setEndTime(end);
  };


  useEffect(() => {
    console.log("startDateTime:", startDateTime);
  }, [startDateTime]);

  useEffect(() => {
    console.log("endDateTime:", endDateTime);
  }, [endDateTime]);


  const modifiers = (isBookedOnDate) => ({
    disabled: date => getDay(date) === isBookedOnDate
  });

  const modifierStyles = {
    backgroundColor: 'blue',
    color: 'white',
  };
  // function to disable specific dates and times based on bookings
  const isDisabled = (date, bookings) => {
    const isBookedOnDate = bookings.some(booking =>
      isWithinInterval(date, { start: new Date(booking.startDateTime), end: new Date(booking.endDateTime) })
      && booking.bookingStatus !== 'REJECTED'
    );
    return isBookedOnDate;
  };
  const disableTime = (date) => {
    const bookingsAtDate = bookings.filter(
      (booking) =>
        moment(date).isBetween(booking.startDateTime, booking.endDateTime) ||
        moment(date).isSame(booking.startDateTime) ||
        moment(date).isSame(booking.endDateTime)
    );

    if (bookingsAtDate.length > 0) {
      const booking = bookingsAtDate[0];
      const bookingDuration = moment.duration(
        moment(booking.endDateTime).diff(moment(booking.startDateTime))
      );
      const bookingHours = bookingDuration.asHours();

      if (bookingHours < 24) {
        const disabledMinutes = [];
        const start = moment(booking.startDateTime);
        const end = moment(booking.endDateTime);
        const minutes = end.diff(start, "minutes");
        for (let i = 0; i <= minutes; i += 15) {
          disabledMinutes.push(start.clone().add(i, "minutes").minute());
        }
        return {
          disabledHours: () => [start.hour()],
          disabledMinutes: () => disabledMinutes,
        };
      } else {
        const disabledHours = [];
        const start = moment(booking.startDateTime).startOf("day");
        const end = moment(booking.endDateTime).startOf("day");
        const days = end.diff(start, "days") + 1;
        for (let i = 0; i < days; i++) {
          const date = start.clone().add(i, "days");
          const hours = bookingDuration.asHours() - i * 24;
          if (hours >= 24) {
            disabledHours.push(date.hour());
          }
        }
        return {
          disabledHours: () => disabledHours,
        };
      }
    }

    return {};
  };

  const checkType = (imageType) => {
    if (imageType.hubName == "The Podcast Studio") {
      return podcast;
    } else if (imageType.hubName == "The Film Studio") {
      return film;
    } else {
      return coWorking;
    }
  }
  // equipmentBrand input to upperCase
  const hubtype = data.hubtype ? data.hubtype.toUpperCase() : '';


  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/bookings/placeHubBooking`);
      setBooking(response.booking);
      console.log(response.booking)
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      {data ? (
        <Page>
          <CreateMessageContainer>
            {createdMessage && <CreateMessage>{createdMessage}</CreateMessage>}
          </CreateMessageContainer>
          <EquipmentImage src={checkType(data)} />
          <Brand>{hubtype}</Brand>
          <Name>{data.name}</Name>
          <div>
            <LocationBg>
              <LocationIcon />
              <LocationTxt> Location</LocationTxt>
              <Location>{data.location}</Location>
            </LocationBg>
            <MaxDaysToRentBg>
              <ClockIcon />
              <MaxDaysToRentTxt>Max time to rent</MaxDaysToRentTxt>
              <MaxDaysToRent>{data.maxTimeToRent} h</MaxDaysToRent>
            </MaxDaysToRentBg>
            <DescBg>
              <DescTxt>Description</DescTxt>
              <Description>{data.description}<ViewMore>View more</ViewMore>
              </Description>
            </DescBg>
          </div>

          <CalendarContainer>
            <div>
              <SelectContainer>
                <SelectStartBg>
                  <SelectStartLbl>Start date:</SelectStartLbl>
                  <SelectStartTxt>{startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</SelectStartTxt>
                </SelectStartBg>
                <SelectEndBg>
                  <SelectEndLbl>End date: </SelectEndLbl>
                  <SelectEndTxt>{endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</SelectEndTxt>
                </SelectEndBg>
              </SelectContainer>
              <DateRangePickerCalendar
                startDate={startDate}
                endDate={endDate}
                focus={focus}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onFocusChange={handleFocusChange}
                locale={enGB}
                touchDragEnabled={true}
                dateFormat="yyyy-MM-dd:HH:mm"
                maximumLength={data.maxTimeToRent}
                modifiers={modifiers}
                modifierStyles={modifierStyles}

              />

              <TimeContainer>
                <TimePicker2
                  showSecond={false}
                  value={[startTime, endTime]}
                  onChange={handleTimeChange}
                  format="HH:mm"
                  use12Hours={false}
                  disabledHours={disableTime}
                />
              </TimeContainer>
            </div>
          </CalendarContainer>

          <MakeReservationBtn onClick={handleBooking}>Make Reservation</MakeReservationBtn>

        </Page>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default EquipmentItem;