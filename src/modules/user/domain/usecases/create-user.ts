import { UserModel } from "../../usercases/ports/create-user-repository";
import { User } from "../models/user";

export type CreateUserParams = Pick<User, "firstName" | "lastName" | "email" | "password">

export interface CreateUser {
  create: (params: CreateUserParams) => Promise<UserModel>
}

