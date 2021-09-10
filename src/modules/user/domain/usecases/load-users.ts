import { User } from "../models/user";

export type LoadUsersUsecaseResult = Array<Omit<User, "password">>

export interface LoadUsersUsecase {
  load(): Promise<LoadUsersUsecaseResult>
}
