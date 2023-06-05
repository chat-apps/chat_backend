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
  linkedUserId: number;
  userId: number;
}

export interface newMessageTypes {
  text: string;
  chatId: number;
  userId: number;
}

export interface getUserChatTypes {
  userId: number;
}

export interface getChatByIdType {
  linkedUserId: number;
  userId: number;
}