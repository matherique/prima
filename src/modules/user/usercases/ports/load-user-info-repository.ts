import { User } from "../../domain/models/user";

export interface LoadUserInfoRepository { 
  find(id: number): Promise<Omit<User, "password"> | null>
}
