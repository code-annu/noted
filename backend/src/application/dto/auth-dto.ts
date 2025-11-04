export interface SignupInputDTO {
  username: string;
  password: string;
  fullname: string;
  bio?: string;
  profilePictureUrl: string;
}

export interface LoginInputDTO {
  username: string;
  password: string;
}

export interface AuthOutputDTO {
  id: string;
  username: string;
  fullname: string;
  profilePictureUrl: string;
  bio: string | null;
  refreshToken: string | null;
  accessToken: string;
  updatedAt: Date;
  createdAt: Date;
}
