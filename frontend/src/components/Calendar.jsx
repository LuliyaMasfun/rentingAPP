import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import styled from '@emotion/styled'
import { getDay, isWithinInterval } from 'date-fns'
import { TimePicker } from 'antd';
import axios from 'axios'
import moment from 'moment';


const Container = styled.div`
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

const SelectStartTxt = styled.p`
position: absolute;
color: #EFEFEF;
width: 160px;
margin-top: 1vh;
background-color: transparent;
border: 1px solid #323232;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
text-align: center;

`;
const SelectEndTxt = styled.p`
position: absolute;
color: #EFEFEF;
margin-top: 1vh;
margin-left: 21.5vh;
background-color: transparent;
border: 1px solid #323232;
width:160px;
height:60px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
text-align: center;

`;


export default function Calendar({ rentalId, handleBooking }) {
  const [startDateTime, setStartDateTime] = useState()
  const [endDateTime, setEndDateTime] = useState()
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE)
  const [data, setData] = useState([])
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
  const handleSelect = (startDateTime, endDateTime) => {
    // Pass startDateTime and endDateTime up to the parent component
    onSelect(startDateTime, endDateTime);
  }
  /*
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/bookingsV2/bookingsOnThisRental/${id}`);
          if (response.data.length > 0) {
            setData(response.data);
            console.log(response.data)
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  */

  // Define modifiers
  const modifiers = {
    disabled: date => {
      // Check if date is within any booking interval
      for (const booking of data) {
        const start = new Date(booking.startDateTime);
        const end = new Date(booking.endDateTime);
        if (isWithinInterval(date, { start, end })) {
          return true;
        }
      }
      return false;
    }
  };


  // const maximumLength = data.maxTimeToRent;

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleStartTimeChange = time => {
    setStartTime(time);
    if (time) {
      const formattedTime = time.format('HH:mm');
      const newDate = new Date(startDate);
      newDate.setHours(formattedTime.split(':')[0]);
      newDate.setMinutes(formattedTime.split(':')[1]);
      if (isNaN(newDate.getTime())) {
        console.error('Invalid date:', newDate);
        return;
      }
      const formattedDate = `${format(newDate, 'yyyy-MM-dd')} ${formattedTime}`;
      setStartDateTime(formattedDate);
      //console.log(formattedDate);
    }
  };

  const handleEndTimeChange = time => {
    setEndTime(time);
    if (time) {
      console.log('time:', time);
      const formattedTime = time.format('HH:mm');
      console.log("formattedTime:", formattedTime);
      const newDate = new Date(endDate);
      newDate.setHours(formattedTime.split(':')[0]);
      newDate.setMinutes(formattedTime.split(':')[1]);
      console.log("newDate:", newDate);
      const formattedDate = `${format(newDate, 'yyyy-MM-dd')} ${formattedTime}`;
      console.log("formattedDate:", formattedDate);
      setEndDateTime(formattedDate);
    }
  };

  useEffect(() => {
    console.log("startDateTime:", startDateTime);
  }, [startDateTime]);

  useEffect(() => {
    console.log("endDateTime:", endDateTime);
  }, [endDateTime]);

  return (

    <Container>
      <div>
        <SelectContainer>
          <SelectStartTxt>Start date: {startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</SelectStartTxt>
          <SelectEndTxt>End date: {endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</SelectEndTxt>
        </SelectContainer>
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFocusChange={handleFocusChange}
          locale={enGB}
          modifiers={modifiers}
          touchDragEnabled={true}
          dateFormat="yyyy-MM-dd:HH:mm"
          onSelectSlot={handleSelect}
          onBooking={handleBooking}
        />

        <TimePicker
          showSecond={false}
          value={startTime}
          onChange={handleStartTimeChange}
          format="HH:mm"
          use12Hours={false}
        />
        <TimePicker
          showSecond={false}
          value={endTime}
          onChange={handleEndTimeChange}
          format="HH:mm"
          use12Hours={false}
        />

      </div>
    </Container>
  )
}

