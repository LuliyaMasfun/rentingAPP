import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/hub/getAllHubs");
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
      type: "pie",
      width: 350,
      height: 200
    },
    title: {
      text: "Pie Chart",
    },
    series: [
      {
        name: "Hubs",
        data: data.map((item) => ({ name: item.hub, y: 2 })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
export default PieChart;