import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


function LineChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/bookings/allHubBookings");
      const data = response.data;
      setData(data);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Line Chart",
    },
    xAxis: {
      categories: data.map((item) => item.startDate),
    },
    series: [
      {
        name: "Data",
        data: data.map((item)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default LineChart;



