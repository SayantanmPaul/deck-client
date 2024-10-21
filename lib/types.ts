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

export interface CurrentUserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bio: string;
  userName: string;
  friends: string[];
  incomingFriendRequests: string[];
  sentFriendRequests: string[];
}

export interface FriendRequestType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  senderId?: string;
  receiverId?: string;
}

export interface ConversationType {
  _id: string;
  messages: MessageType[];
}

export interface MessageType {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timeStamp: string;
  contentUrl?: string;
  contentType?: string;
}

export interface ConversationPartnerType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  userName: string;
}