import { InsertBook } from "@/app/_models/book";
import axios from "../axios";
import { Option } from "@/components/ui/multiple-selector";



// interface BookInsertBody {
//   categories: Option[];
//   book_title: string;
//   status: Option[];
//   author: Option[];
//   publisher: Option[];
//   book_summary: string;
// }
export const postInsertBookClient = (formData:any) => {
  return axios.post("/books/insert", formData, { headers: {'Content-Type': 'multipart/form-data'}})
}

// export const postInsertBookClient = (data:BookInsertBody, formData:FormData ) => {
//    const props = {
//     data : data,
//     formData : formData
//   };
//   return axios.post(`/books/insert`, props,  { headers: {'Content-Type': 'multipart/form-data'}});
// };

export const getAllBooksClient = () => {
  return axios.get(`/books`);
};

export const deleteBookClient = (book_id: number) => {
  return axios.delete(`/books/${book_id}`);
};

export const getUserBookGridCollapseList = (user_id: string) => {
  return axios.get(`/books/userBookGridCollapseList/${user_id}`);
};



