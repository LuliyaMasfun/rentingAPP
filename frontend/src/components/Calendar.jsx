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
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-02-11T13:00",
    endDatetime: "2023-02-13T14:30",
  },
  {
    id: 3,
    name: "heyy",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-02-15T10:00",
    endDatetime: "2023-02-19T18:30",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
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
    isSameDay(parseISO(booking.startDatetime), selectedDay)
  );

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
    margin-top: 2vh;
    margin-left: 2vh;
    font-weight: 400;
    color: #efefef;
  `;

  const LeftIcon = styled(FaChevronLeft)`
    position: absolute;
    left: 0;
    margin-left: 4vh;
    margin-top: 0vh;
    color: #efefef;
  `;

  const RightIcon = styled(FaChevronRight)`
    position: absolute;
    margin-left: 1vh;
    margin-top: 0vh;
    color: #efefef;
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
    grid-template-columns: 7;
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
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <YearMonth>
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </YearMonth>
                <button type="button" onClick={previousMonth}>
                  <LeftIcon />
                </button>
                <button onClick={nextMonth} type="button">
                  <RightIcon />
                </button>
              </div>
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
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-yellow-500",
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-300",
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-300",
                        isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-red-500",
                        isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-yellow-500",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                        "absolute mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
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
          </div>
        </div>
      </div>
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
