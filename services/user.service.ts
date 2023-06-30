import { Model, Op } from "sequelize";
import { User } from "../models/user.model";
import { comparePassword, plainToHash } from "../utils";
import { loginUserType, newUserType } from "./types";
import { checkAllUSersAlreadyHaveRoomWithOtherUser, getRoomByByBothUserIDsService } from "./room.service";

const checkUserExist = async (email: string) => {
  const user = await User.findOne({ where: { email } });

  return !!user;
}
const checkUserExistById = async (ID: number) => {
  const user = await User.findByPk(ID);

  return !!user;
}

const createUserService = async (input: newUserType) => {
  try {
    const { name, email, password } = input

    const userExist = await checkUserExist(email)
    if (userExist) throw new Error(`User ${email} already exists`)

    const hashPassword = await plainToHash(password)
    let newUser = await User.create({ name, email, password: hashPassword })

    return newUser
  } catch (error: any) {
    throw new Error(error)
  }
}

const loginUserService = async (input: loginUserType) => {
  try {
    const { email, password } = input
    const user: any = await User.findOne({ where: { email } })
    if (!user) throw new Error("Invalid Credentials");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid Credentials');

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllUsersService = async (userID: number) => {
  try {
    const users: any[] = await User.findAll({ where: { ID: { [Op.ne]: userID } } });

    users.forEach((user) => {
      delete user.dataValues.password
    })

    const removedAlreadyLinkedUsers = checkAllUSersAlreadyHaveRoomWithOtherUser(users, userID)


    return removedAlreadyLinkedUsers;
  } catch (error: any) {
    throw new Error(error);
  }
};


export { createUserService, loginUserService, checkUserExistById, getAllUsersService };
