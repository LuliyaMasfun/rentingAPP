import React from 'react';
import axios from 'axios';

const ItemPage = ({ item }) => {
  return (
    <div>
      <h2>{item.title}</h2>
      <img src={item.backgroundImage} />
      <p>{item.location}</p>
    </div>
  );
};

ItemPage.getInitialProps = async ({ query }) => {
  const res = await axios.get(`https://my-api.com/items/${query.id}`);
  return { item: res.data };
};

export default ItemPage;