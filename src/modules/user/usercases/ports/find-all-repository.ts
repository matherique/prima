import { User } from "@prisma/client";

export interface FindAllRepository {
  findAll(): Promise<User[]>
}
