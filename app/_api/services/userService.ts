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

export const getAllUsers = () => {
  return axios.get(`/users/get-all-users`);
};

export const updateUserAuthority = (target_user_id: string, authority_id:string) => {
  const props = {
    target_user_id:target_user_id,
    authority_id:authority_id,
  }
  return axios.patch(`/users/update-user-authority`,props);
}
