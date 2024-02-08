import axios from "../axios";

export const getAuthorsAndBooksCount = () => {
  return axios.get(`/authors/getAuthorsAndBooksCount`);
};

export const getInsertAuthorClient = (name: string, surname: string) => {
  const props = {
    author_name: name,
    author_surname: surname,
  };
  return axios.post(`/authors/insert`, props);
};

export const getAllAuthorsClient = () => {
  return axios.get(`/authors/`);
};

export const getAllAuthorsSelectClient = () => {
  return axios.get(`/authors/select`);
};
