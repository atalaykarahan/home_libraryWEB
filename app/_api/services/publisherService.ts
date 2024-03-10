import axios from "../axios";

export const getAllPublisherClient = () => {
  return axios.get(`/publishers`);
};

export const getInsertPublisherClient = (publisher: string) => {
  return axios.get(`publishers/insert/${publisher}`);
};

export const getPublishersAndBooksCount = () => {
  return axios.get(`/publishers/getPublishersAndBooksCount`);
};

export const deletePublisherClient = (publisher_id: string) => {
  return axios.delete(`/publishers/${publisher_id}`);
};

export const patchPublisherClient = (
  publisher_id: string,
  publisher_name: string
) => {
  const props = {
    publisher_id: publisher_id,
    publisher_name: publisher_name,
  };
  return axios.patch(`/publishers`, props);
};
