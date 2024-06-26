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

export const patchAuthorClient = (
  author_id: string,
  author_name: string,
  author_surname: string
) => {
  const props = {
    author_id: author_id,
    author_name: author_name,
    author_surname: author_surname,
  };
  return axios.patch(`/authors`, props);
};

export const deleteAuthorClient = (author_id: string) => {
  return axios.delete(`/authors/${author_id}`);
};

// export const patchAuthorClient = (
//   author_id: string,
// ) => {
//   const props = {
//     author_id: author_id,
//   };
//   return axios.patch(`/authors`, props);
// };


