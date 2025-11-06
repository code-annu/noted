export interface User {
  id: string;
  username: string;
  profilePictureUrl: string;
  fullname: string;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  refreshToken: string;
}

export interface SignupCredential {
  fullname: string;
  username: string;
  password: string;
  profilePictureUrl: string;
  bio?: string | null;
}

export interface LoginCredential {
  username: string;
  password: string;
}
