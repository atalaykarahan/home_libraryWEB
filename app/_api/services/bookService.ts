import { InsertBook } from "@/app/_models/book";
import axios from "../axios";

export const postInsertBookClient = (book: InsertBook) => {
  return axios.post(`/books/insert`, book);
};

export const getAllBooksClient = () => {
  return axios.get(`/books`);
};

export const deleteBookClient = (book_id: number) => {
  return axios.delete(`/books/${book_id}`);
};
