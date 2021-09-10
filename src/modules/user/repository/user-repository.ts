import { CreateUserParams } from '../domain/usecases/create-user';
import { CreateUserRepository, CreateUserRepositoryResult } from '../usercases/ports/create-user-repository'
import { PrismaClient, User } from '@prisma/client';
import { FindByEmailRepository } from '../usercases/ports/find-by-email-repository';

export class UserRepository implements CreateUserRepository, FindByEmailRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(data: CreateUserParams): Promise<CreateUserRepositoryResult> {
    const usedEmail = await this.db.user.findUnique({
      where: { email: data.email }
    })

    if (usedEmail) {
      return null
    }

    const newUser = await this.db.user.create({ data })

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return this.db.user.findUnique({
      where: { email }
    });
  }
}
