import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PieChart() {

  const rentalTypes = ["Hub", "Events", "Equipments"];

  const options = {
    chart: {
      type: "pie",
      width: 350,
      height: 200,
      backgroundColor: "transparent",
    },
    title: {
      text: "Bookings per rental type",
      style: {
        color: "#EFEFEF",
        fontSize: 16,
      },
    },
    series: [
      {
        name: "Rental Types",
        data: [
          {
            name: rentalTypes[0],
            y: 13
          },
          {
            name: rentalTypes[1],
            y: 2
          },
          {
            name: rentalTypes[2],
            y: 27
          }
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
export default PieChart;