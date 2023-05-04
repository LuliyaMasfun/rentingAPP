import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import '../styles/globals.css'
import { FaChevronLeft, FaChevronRight, FaEllipsisV } from 'react-icons/fa'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";
import styled from "@emotion/styled";

/*const [booking, setBooking] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getBookings/${id}`);
      setBooking(response.booking);
      console.log(response.booking)
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);
*/

//TEMPORARY DATA:
const bookings = [

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar2() {
  let today = startOfToday();
  let [startDate, setStartDate] = useState(today);
  let [endDate, setEndDate] = useState(null);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayBookings = bookings.filter((booking) =>
    isSameDay(parseISO(booking.startDatetime), startDate)
  );

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server with the booking details
  };



  const CalenderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30vh;
    margin-left: 2vh;
  `;
  const YearMonth = styled.div`
    display: auto;
    margin-top: 10vh;
    margin-left: 2vh;
    font-weight: 400;
    color: #efefef;
  `;

  const LeftIcon = styled(FaChevronLeft)`
    color: #efefef;
  `;

  const RightIcon = styled(FaChevronRight)`
    color: #efefef;
  `;
  const PreviousMonth = styled.button`
  position: absolute;
  margin-top: -2.3vh;
  margin-left: -1vh;
  
  `;
  const NextMonth = styled.button`
  position: absolute;
  margin-top: -2.3vh;
  margin-left: 14vh;
  `;

  const Weekday = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 6px;
    align-text: center;
    color: #efefef;
    font-weight: 300;
  `;
  const Mon = styled.p`
    margin-right: 15px;
  `;
  const Tue = styled.p`
    margin-right: 15px;
  `;
  const Wed = styled.p`
    margin-right: 15px;
  `;
  const Thu = styled.p`
    margin-right: 15px;
  `;
  const Fri = styled.p`
    margin-right: 15px;
  `;
  const Sat = styled.p`
    margin-right: 15px;
  `;
  const Sun = styled.p`
    margin-right: 15px;
  `;

  const DateDays = styled.div`
    display: grid;
    flex-direction: grid;
    grid-template-columns: repeat(7, 1fr);
    color: #efefef;
  `;

  const PlacedBookings = styled.div`
    position: absolute;
    margin-left: -1vh;
    color: #525252;
    margin-top: 0vh;
  `;

  const BusyDateIndicator = styled.hr`
    width: vh;
    margin-top: -2.8vh;
    margin-left: -1.5vh;
  `;

  return (
    <CalenderContainer>
      <div className="md:pr-14">
        <YearMonth>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </YearMonth>
        <PreviousMonth type="button" onClick={previousMonth}>
          <LeftIcon />
        </PreviousMonth>
        <NextMonth onClick={nextMonth} type="button">
          <RightIcon />
        </NextMonth>
        <Weekday>
          <Mon>MON</Mon>
          <Tue>TUE</Tue>
          <Wed>WED</Wed>
          <Thu>THU</Thu>
          <Fri>FRI</Fri>
          <Sat>SAT</Sat>
          <Sun>SUN</Sun>
        </Weekday>

        <DateDays>
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                id="startDate"
                type="button"
                onClick={() => setStartDate(day)}
                onChange={handleStartDateChange}
                className={`absolute mx-auto flex h-8 w-8 items-center justify-center rounded-full
                ${isEqual(day, startDate)
                    ? isToday(day)
                      ? "bg-red-500 text-white font-semibold"
                      : "bg-yellow-500 text-white font-semibold"
                    : isToday(day)
                      ? "text-yellow-500 font-semibold"
                      : isSameMonth(day, firstDayCurrentMonth)
                        ? "text-gray-300"
                        : "text-gray-300"
                  }
                    ${!isEqual(day, startDate) && "hover:bg-gray-200"} `}
              >
                <time date={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>


              <div className="w-5 mx-auto mt-10">
                {bookings.some((booking) =>
                  isSameDay(parseISO(booking.startDatetime), day)
                ) && <BusyDateIndicator></BusyDateIndicator>}
              </div>
            </div>
          ))}
        </DateDays>
      </div>
      <PlacedBookings>
        {selectedDayBookings.length > 0 ? (
          selectedDayBookings.map((booking) => (
            <Booking booking={booking} key={booking.id} />
          ))
        ) : (
          <p>No bookings for today.</p>
        )}
      </PlacedBookings>
    </CalenderContainer>
  );
}

function Booking({ booking }) {
  let startDateTime = parseISO(booking.startDatetime);
  let endDateTime = parseISO(booking.endDatetime);
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p className="mt-0.5">
          <time dateTime={booking.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={booking.endDatetime}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
    </li>
  );
}

let colStartClasses = [
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',

]
