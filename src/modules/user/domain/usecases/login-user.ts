import { User } from "../models/user"

export type LoginUserUsecaseParams = Pick<User, "email" | "password">

export type LoginUserUsecaseResult = {
  token: string
}

export interface LoginUserUsecase {
  login(params: LoginUserUsecaseParams): Promise<LoginUserUsecaseResult>
}


