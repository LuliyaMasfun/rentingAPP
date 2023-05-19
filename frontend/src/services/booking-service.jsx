import axios from "axios";
const API_URL = "http://localhost:8080/rentals/";

const getAllBookings = async () => {
  const res = await axios.get(API_URL + `getAllRentals`);
  console.log(res);
};

const bookingservice = {
  getAllBookings,
};
export default bookingservice;
