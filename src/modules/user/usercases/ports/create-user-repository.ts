import { CreateUserParams } from "../../domain/usecases/create-user"

export type UserModel = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updateAt: Date
}


export type CreateUserRepositoryParams = CreateUserParams

export interface CreateUserRepository {
  save: (data: CreateUserRepositoryParams) => Promise<UserModel | null> 
}

