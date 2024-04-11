import axios from "../axios";

export const postInsertBookClient = (formData: any) => {
  return axios.post("/books/insert", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllBooksClient = () => {
  return axios.get(`/books`);
};

export const deleteBookClient = (book_id: number) => {
  return axios.delete(`/books/${book_id}`);
};

export const getUserBookGridCollapseList = (user_id: string) => {
  return axios.get(`/books/userBookGridCollapseList/${user_id}`);
};

export const getLastInsertedReachableBook = () => {
  return axios.get("/books/lastInsertedReachableBook");
};
