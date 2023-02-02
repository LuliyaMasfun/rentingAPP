import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { FaRegBookmark, FaMapMarkerAlt } from "react-icons/fa";
import styled from "@emotion/styled";
import Image from 'next/image';

const Background = styled(Image)`
position:absolute;

`;

const CardTitle = styled.p`
color:blue;
font-size: 14px;
position: absolute;
`;

const Location = styled.p`
color: black;
`;

const BookmarkIcon = styled(FaRegBookmark)`
position: absolute
`;

const LocationIcon = styled(FaMapMarkerAlt)``;

const Card = ({ equipment_name, equipment_img, equipment_location, id }) => (
  <div>

    <Background style={{ backgroundImage: `url(${equipment_img})` }} onClick={() => Router.push(`/item?id=${id}`)} />
    <BookmarkIcon />
    <CardTitle>{equipment_name}</CardTitle>
    <LocationIcon />
    <Location>{equipment_location}</Location>
  </div>
);

const EquipmentsPage = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Card key={item.id}
          equipment_name={item.equipment_name}
          equipment_img={item.equipment_img}
          equipment_location={item.equipment_location}
          id={item.id}

        />
      ))}
    </div>
  );
};

EquipmentsPage.getInitialProps = async () => {
  try {
    const res = await axios.get('http://localhost:8080/allEquipment');
    console.log(items);
    return { items: res.data };
  } catch (error) {
    console.error(error);
  }
  console.log(res.data);
  console.log(items);
};

export default EquipmentsPage;



/*const API_URL = "http://localhost:8080/allEquipment";

const EquipmentDefault = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, { headers: "Access-Control-Allow-Origin: *", });
        console.log(response.data); const info = response.data; setData(info); setIsLoading(false);
      } catch (error) { if (error.response) { console.log(error.response.data); console.log(error.response.status); console.log(error.response.headers); } else { console.log(`Error: ${error.message}`); } }
    }; fetchData();
  }, []);



  return (
    <main className='min-h-screen flex-grow'>

      <div className='flex border-8 m-8'>
        {data.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2> {item.last_name}</h2>
            <p>{item.email}</p>
          </div>

        ))}
      </div>



    </main>

  )
}
export default EquipmentDefault */