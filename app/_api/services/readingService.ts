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

export const updateMyReadingClient = (formData: any) => {
  return axios.patch(`/readings`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// export const updateMyReadingClient = (reading_id:number, status_id?:string, comment?:string) => {
//   const props = {
//     reading_id: reading_id.toString(),
//     status_id: status_id?.toString(),
//     comment:comment
//   }
//   return axios.patch(`/readings`, props);
// }

export const getMyReading = (reading_id: number) => {
  return axios.get(`readings/${reading_id}`);
};
