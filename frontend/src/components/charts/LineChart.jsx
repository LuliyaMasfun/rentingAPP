import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


function LineChart() {
  const options = {
    chart: {
      backgroundColor: 'transparent',
      width: 340,
      height: 150

    },
    title: {
      text: 'Bookings made per month',
      style: {
        color: '#EFEFEF'
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Bookings',
      data: [100, 150, 200, 103, 250, 280, 350, 400, 450, 390, 550, 600],
      color: 'yellow'
    }]

  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default LineChart;



