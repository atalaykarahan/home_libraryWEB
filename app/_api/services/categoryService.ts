import axios from "../axios";

export const getCategoriesAndBooksCount = () => {
  return axios.get(`/categories/getCategoriesAndBooksCount`);
};


export const getInsertCategoryClient = (category:string) => {
    return axios.get(`/categories/insert/${category}`);
}

export const getCategories = () => {
  return axios.get(`/categories/`);
}
