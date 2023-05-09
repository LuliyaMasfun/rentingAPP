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
        color: '#EFEFEF',
        fontSize: 16,
      }
    },
    xAxis: {
      categories: ['1 May', '', '', '', '', '', '15 Maj', '', '', '', '', '', '', '', '30 May']
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
      data: [58, 142, 187, 103, 221, 43, 58, 108, 58, 142, 187, 103, 221, 43, 58],
      color: 'yellow'
    }]

  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default LineChart;



