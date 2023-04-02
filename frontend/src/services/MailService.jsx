const API_URL = env.URL + "/api/";
import axios from "axios";
import env from "../../utils/env";

const sendActivationEmail = (user) => {
  const userId = user.id;
  return axios.post(API_URL + `activation-email/${userId}`, {
    headers: authHeader(),
  });
};

const MailService = {
  sendActivationEmail,
};
export default MailService;
