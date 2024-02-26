import axios from "../axios";

export const getAllStatusesClient = () => {
  return axios.get(`/statuses`);
};
