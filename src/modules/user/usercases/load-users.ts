import { LoadUsersUsecase, LoadUsersUsecaseResult } from "../domain/usecases/load-users"
import { FindAllRepository } from "./ports/find-all-repository"

export class LoadUser implements LoadUsersUsecase {
  constructor(private readonly findAllRepository: FindAllRepository) {}
  async load(): Promise<LoadUsersUsecaseResult> {
    const users = await this.findAllRepository.findAll()
    
    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))
  }
}

