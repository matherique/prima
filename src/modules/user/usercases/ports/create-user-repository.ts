import { User } from "@prisma/client";
import { CreateUserParams } from "../../domain/usecases/create-user";

export type CreateUserRepositoryResult = User | null;
export type CreateUserRepositoryParams = CreateUserParams;

export interface CreateUserRepository {
  save: (
    data: CreateUserRepositoryParams
  ) => Promise<CreateUserRepositoryResult>;
}
