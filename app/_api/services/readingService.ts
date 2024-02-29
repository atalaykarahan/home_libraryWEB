import axios from "../axios";

export const getMyBooks = () => {
  return axios.get(`/readings`);
};

export const removeMyBook = (reading_id:number) => {
  return axios.delete(`/readings/${reading_id}`);
}

