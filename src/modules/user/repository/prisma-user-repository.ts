import { CreateUserParams } from '../domain/usecases/create-user';
import { CreateUserRepository, CreateUserRepositoryResult } from '../usercases/ports/create-user-repository'
import { PrismaClient, User } from '@prisma/client';
import { FindByEmailRepository } from '../usercases/ports/find-by-email-repository';
import { FindAllRepository } from '../usercases/ports/find-all-repository';

export class PrismaUserRepository implements CreateUserRepository, FindByEmailRepository, FindAllRepository {
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

  async findAll(): Promise<User[]> {
    return this.db.user.findMany()
  }
}
