import { UserModel } from "../../usercases/ports/create-user-repository";

export type CreateUserParams = {
  firstName: string
  lastName: string
  email: string
}

export interface CreateUser {
  create: (params: CreateUserParams) => Promise<UserModel>
}

