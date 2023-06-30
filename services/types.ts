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
  linkedUserID: number;
  userID: number;
}

export interface newMessageTypes {
  text: string;
  roomID: number;
  userID: number;
  secondRoomID: number;
}

export interface getUserChatTypes {
  userID: number;
}

export interface getChatByIdType {
  linkedUser: number;
  userID: number;
}