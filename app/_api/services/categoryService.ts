import axios from "../axios";

export const getCategoriesAndBooksCount = () => {
  return axios.get(`/categories/getCategoriesAndBooksCount`);
};

export const getInsertCategoryClient = (category: string) => {
  return axios.get(`/categories/insert/${category}`);
};

export const getCategories = () => {
  return axios.get(`/categories/`);
};

export const patchCategoryClient = (
  category_id: string,
  category_name: string
) => {
  const props = {
    category_id: category_id,
    category_name: category_name,
  };
  return axios.patch(`/categories`, props);
};

export const deleteCategoryClient = (category_id: string) => {
  return axios.delete(`/categories/${category_id}`);
}
