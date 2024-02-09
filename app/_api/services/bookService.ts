import { InsertBook } from "@/app/_models/book";
import axios from "../axios";

export const postInsertBookClient = (book: InsertBook) => {
  return axios.post(`/books/insert`, book);
};
