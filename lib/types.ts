export interface ErrorResponse {
  error: string;
}
export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IUser {
  email: string;
  password: string;
}

export interface CurrentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bio: string;
  friends: string[];
  incomingFriendRequests: string[];
  sentFriendRequests: string[]
}
