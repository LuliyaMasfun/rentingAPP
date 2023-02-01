import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import React from "react";

const ReactCalendar = () => {
    return <div><Calendar minDate={new Date()}
        className="p-2"
        view="month"
        onClickDay={date => console.log(date)} />
    </div>;
};
export default ReactCalendar;
