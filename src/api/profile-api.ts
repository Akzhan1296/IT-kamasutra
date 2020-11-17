import { instance } from "./api"
import { ProfileType,PhotosType } from './../types/types';
import {APIResponseType} from "./api"

type SatePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, { status: status }).then(res => res.data);;
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => res.data);;
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType<SatePhotoResponseDataType>>(`profile`, profile).then(res => res.data);;
  }
};

