import axios from "../axios";

export const getAllStatusesClient = () => {
  return axios.get(`/statuses`);
};

export const getMyStatusesClient = () => {
  return axios.get(`/statuses/my`)
}
