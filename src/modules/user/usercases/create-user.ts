import { CreateUserParams } from "../domain/usecases/create-user"
import { CreateUserRepository, CreateUserRepositoryResult } from "./ports/create-user-repository"

export class CreateUserUsecase {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(data: CreateUserParams): Promise<CreateUserRepositoryResult> {
    const createdUser = await this.createUserRepository.save(data)

    if (!createdUser) {
      return null
    }

    return createdUser
  }
}

