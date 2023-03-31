import React from "react";
import LineChart from "../../components/charts/LineChart";
import PieChartImport from "../../components/charts/PieChart";
import ColumnChartImport from "../../components/charts/ColumnChart";
import NavbarAdmin from "../../components/NavbarAdmin";
import styled from "@emotion/styled";

const Page = styled.div`
  position: absolute;
  height: 1080px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;
const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: white;
`;
const PieChart = styled(PieChartImport)`
display: flex;
margin-top: 130px;
`;
const ColumnChart = styled(ColumnChartImport)`
margin-left: 30px;
`;

function TrackBooking() {
  return (
    <div>
      <Page>
        <NavbarAdmin />
        <PageTitle>Track Bookings</PageTitle>
        <PieChart />
        <ColumnChart />
      </Page>

    </div>
  )
}

export default TrackBooking;