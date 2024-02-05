import axios from "../axios";

export const getAllPublisherClient = () => {
    return axios.get(`/publishers`);
  };

  export const getInsertPublisherClient = (publisher:string) => {
    return axios.get(`publishers/insert/${publisher}`)
  }



  export const getPublishersAndBooksCount = () => {
    return axios.get(`/publishers/getPublishersAndBooksCount`);
  }