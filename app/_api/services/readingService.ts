import axios from "../axios";

export const getMyBooks = () => {
  return axios.get(`/readings`);
};

export const removeMyBook = (reading_id: number) => {
  return axios.delete(`/readings/${reading_id}`);
};

export const addMyLibraryClient = (book_id: number, status_id: number) => {
  return axios.get(`/readings/addMyReading/${book_id}/${status_id}`);
};
