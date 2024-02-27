import axios from "../axios";

export const getMyBooks = () => {
  return axios.get(`/readings`);
};

