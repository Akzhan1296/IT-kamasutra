import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "c52e9e8c-81df-47a9-a145-f653131d585b",
  },
});

export const usersAPI = {
  getUsers(currentPage = 9, pageSize = 2) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getProfile(userId){
    console.warn('Obsolete method. Please profileAPI object')
      return profileAPI.getProfile(userId);

  },

  unFollow(id){
     return instance.delete(`follow/${id}`)
    .then(response => response.data)
  },

  follow(id){
    return instance.post(`follow/${id}`)
    .then(response => response.data)
  }
};

export const profileAPI = {

  getProfile(userId){
      return instance.get(`profile/${userId}`)
      .then(response => response.data)
  },
  getStatus(userId){
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status ){
    return instance.put(`profile/status`, {status: status} )
  }
};


export const authAPI = {
  auth(){
    return instance.get('auth/me')
    .then(response => response.data)
},
}