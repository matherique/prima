import { User } from "@prisma/client";

export interface FindByEmailRepository {
  find(email: string): Promise<User|null>
}
