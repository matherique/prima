import { CreateUserParams } from "../domain/usecases/create-user"
import { CreateUserRepository, CreateUserRepositoryResult } from "./ports/create-user-repository"
import { HashingService } from "./ports/hashing-service"

export class CreateUserUsecase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly hashingService: HashingService
  ) {}

  async create(data: CreateUserParams): Promise<CreateUserRepositoryResult> {
    const hashedPassword = await this.hashingService.encode(data.password)

    const createdUser = await this.createUserRepository.save({
      ...data, password: hashedPassword 
    })

    if (!createdUser) {
      return null
    }

    return createdUser
  }
}

