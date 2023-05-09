import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ColumnChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/bookingsV2/allBookings"
      );
      const bookings = response.data;
      const groupedData = bookings.reduce((result, booking) => {
        const status = booking.bookingStatus;
        result[status] = (result[status] || 0) + 1;
        return result;
      }, {});
      setData(groupedData);
    }

    fetchData();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: "column",
      width: 350,
      height: 250,
      backgroundColor: 'transparent'
    },
    title: {
      text: "Rejected and approved bookings",
      style: {
        color: '#EFEFEF',
        fontSize: 16,
      }
    },
    xAxis: {
      categories: Object.keys(data),
    },
    yAxis: {
      title: {
        text: "Number of Bookings",
      },
    },
    series: [
      {
        name: "Bookings",
        data: Object.values(data),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;

}

export default ColumnChart;