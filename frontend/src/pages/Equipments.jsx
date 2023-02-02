import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import {FaRegBookmark, FaMapMarkerAlt} from "react-icons/fa";
import styled from "@emotion/styled";
import Image from 'next/image';

const Page = styled.div`
  background-size: cover;
  background-position: center;
  background-color: #1E1E1E;
`;

const Background = styled(Image)`

`;

const CardTitle = styled.p`
`;

const Location = styled.p``;

const Card = ({ equipment_name, equipment_img, equipment_location, id }) => (
    <div>

    <Background style={{ backgroundImage: `url(${equipment_img})` }} onClick={() => Router.push(`/item?id=${id}`)} />
        <FaRegBookmark />
      <CardTitle>{equipment_name}</CardTitle>
      <FaMapMarkerAlt />
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
           id={item.id} />
        ))}
      </div>
    );
  };
  
  EquipmentsPage.getInitialProps = async () => {
    const res = await axios.get('http://localhost:8080/allEquipment');
    return { items: res.data };
  };
  
  export default EquipmentsPage;