export interface newUserType {
  name: string;
  email: string;
  password: string;
}
export interface loginUserType {
  email: string;
  password: string;
}

export interface newChatTypes {
  linkedUser: number;
  userId: number;
}

export interface newMessageTypes {
  text: string;
  roomID: number;
  userID: number;
}

export interface getUserChatTypes {
  userId: number;
}

export interface getChatByIdType {
  linkedUser: number;
  userId: number;
}