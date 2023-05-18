import axios from "axios";
const API_URL = "http://localhost:8080/bookingsV2/";

const getAllBookings = async () => {
  return await axios.get(API_URL + `allBookings`);
};

const bookingservice = {
  getAllBookings,
};
export default bookingservice;
