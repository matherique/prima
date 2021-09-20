import { User } from "../models/user";

export type LoadUserInfoUsecaseParams = User["id"]
export type LoadUserInfoResponse = Omit<User, "password"> | null

export interface LoadUserInfoUsecase {
  load(id: LoadUserInfoUsecaseParams): Promise<LoadUserInfoResponse>
}
