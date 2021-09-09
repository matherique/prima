import { User } from "@prisma/client";

export interface FindByEmailRepository {
  findByEmail(email: string): Promise<User|null>
}
