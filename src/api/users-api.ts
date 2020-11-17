
import { instance, GetItemsType, APIResponseType } from "./api"


export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  unFollow(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data) as Promise<APIResponseType>;
  },

  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then((response) => response.data);
  },
};
