import axios from "../axios";

export const getUserBookGridList = () => {
  return axios.get(`/users/userBookGridList`);
};

export const patchUpdateVisibility = (
  user_visibility: boolean,
  user_library_visibility: boolean
) => {
  const props = {
    user_library_visibility: user_library_visibility,
    user_visibility: user_visibility,
  };

  return axios.patch(`/users/update-visibility`, props);
};
