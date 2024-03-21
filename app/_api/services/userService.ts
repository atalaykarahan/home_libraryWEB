import axios from "../axios";

export const getUserBookGridList = () => {
  return axios.get(`/users/userBookGridList`);
};

