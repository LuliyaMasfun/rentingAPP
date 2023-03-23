import React from "react";
import CalendarReact from 'react-calendar';
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { startOfToday, isSameDay, toDate } from "date-fns";
import 'react-calendar/dist/Calendar.css';


const Calendar = styled(CalendarReact)`
position: absolute;
margin-top: 40vh;
margin-left: 2vh;
width: 350px;
max-width: 100%;
color: #ffff;
line-height: 4em;
background-color: transparent;
border: none;
`;

const DateCell = styled.div`

  
`;


export default function CalendarComponent() {
  let today = startOfToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(new Date());


  const maxDate = new Date(); // today
  const minDate = new Date('2000-01-01');


  return (
    <div>
      <Calendar
        onChange={(dates) => {
          setStartDate(today);
          setEndDate(dates[1]);
        }}
        selectRange={true}
        value={[startDate, endDate]}
        tileContent={({ date, view }) => {
          if (startDate && endDate && view === 'month') {
            const isStart = isSameDay(date, startDate);
            const isEnd = isSameDay(date, endDate);
            return (
              <DateCell isStart={isStart} isEnd={isEnd}>
                <div>{date.getDate()}</div>
              </DateCell>
            );
          }
        }}
      />
    </div>
  );
}