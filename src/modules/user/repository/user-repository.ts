import { CreateUserParams } from '../domain/usecases/create-user';
import { CreateUserRepository, UserModel } from '../usercases/ports/create-user-repository'
import { PrismaClient } from '@prisma/client';

export class UserRepository implements CreateUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(data: CreateUserParams): Promise<UserModel> {
    const usedEmail = await this.db.user.findUnique({
      where: { email: data.email }
    })

    if (usedEmail) {
      return null
    }

    const newUser = await this.db.user.create({ data })

    return newUser
  }
}
