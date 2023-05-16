import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import {
  DateRangePickerCalendar,
  START_DATE,
  useDateInput,
} from "react-nice-dates";
import "react-nice-dates/build/style.css";
import styled from "@emotion/styled";
import { getDay, isWithinInterval } from "date-fns";
import { TimePicker } from "antd";
import axios from "axios";
import moment from "moment";

const bookings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-11T13:00",
    endDatetime: "2022-05-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T09:00",
    endDatetime: "2022-05-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T17:00",
    endDatetime: "2022-05-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-06-09T13:00",
    endDatetime: "2022-06-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-13T14:00",
    endDatetime: "2022-05-13T14:30",
  },
];

const Container = styled.div`
  position: absolute;
  margin-top: 37vh;
  margin-left: 3vh;
  width: 340px;

  .nice-dates-day.-modifiers {
    color: orange;
  }
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 340px;
  height: 65px;
  margin-bottom: 3vh;
`;

const SelectStartTxt = styled.p`
  position: absolute;
  color: #efefef;
  width: 160px;
  margin-top: 1vh;
  background-color: transparent;
  border: 1px solid #323232;
  width: 160px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;
const SelectEndTxt = styled.p`
  position: absolute;
  color: #efefef;
  margin-top: 1vh;
  margin-left: 21.5vh;
  background-color: transparent;
  border: 1px solid #323232;
  width: 160px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

function swapDates(startDay, endDay) {
  setStartDay(endDay);
  setEndDay(startDay);
}

export default function Calendar({ rentalId, handleBooking }) {
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const [data, setData] = useState([]);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };
  const handleSelect = (startDateTime, endDateTime) => {
    // Pass startDateTime and endDateTime up to the parent component
    onSelect(startDateTime, endDateTime);
  };
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
    disabled: (date) => {
      // Check if date is within any booking interval
      for (const booking of data) {
        const start = new Date(booking.startDateTime);
        const end = new Date(booking.endDateTime);
        if (isWithinInterval(date, { start, end })) {
          return true;
        }
      }
      return false;
    },
  };

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // const maximumLength = data.maxTimeToRent;

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    if (time) {
      const formattedTime = time.format("HH:mm");
      const newDate = new Date(startDate);
      newDate.setHours(formattedTime.split(":")[0]);
      newDate.setMinutes(formattedTime.split(":")[1]);
      if (isNaN(newDate.getTime())) {
        console.error("Invalid date:", newDate);
        return;
      }
      const formattedDate = `${format(newDate, "yyyy-MM-dd")} ${formattedTime}`;
      setStartDateTime(formattedDate);
      //console.log(formattedDate);
    }
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    if (time) {
      console.log("time:", time);
      const formattedTime = time.format("HH:mm");
      console.log("formattedTime:", formattedTime);
      const newDate = new Date(endDate);
      newDate.setHours(formattedTime.split(":")[0]);
      newDate.setMinutes(formattedTime.split(":")[1]);
      console.log("newDate:", newDate);
      const formattedDate = `${format(newDate, "yyyy-MM-dd")} ${formattedTime}`;
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
          <SelectStartTxt>
            Start date:{" "}
            {startDate
              ? format(startDate, "yyyy-MM-dd", { locale: enGB })
              : "none"}
            .
          </SelectStartTxt>
          <SelectEndTxt>
            End date:{" "}
            {endDate ? format(endDate, "yyyy-MM-dd", { locale: enGB }) : "none"}
            .
          </SelectEndTxt>
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
  );
}
