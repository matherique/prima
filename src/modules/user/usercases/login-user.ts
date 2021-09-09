import { LoginUserUsecase, LoginUserUsecaseParams, LoginUserUsecaseResult } from "../domain/usecases/login-user";
import { FindByEmailRepository } from "./ports/find-by-email-repository";
import { HashingService } from "./ports/hashing-service";

export class LoginUser implements LoginUserUsecase {
  constructor(
    private readonly findByEmailRepository: FindByEmailRepository,
    private readonly hashingService: HashingService,
  ) {}

  async login({ email, password }: LoginUserUsecaseParams): Promise<LoginUserUsecaseResult> {
    const user = await this.findByEmailRepository.find(email)

    if (!user) {
      return null
    }
      
    const isCorretPassword = await this.hashingService.compare(password, user.password)

    if (!isCorretPassword) { 
      return null
    }

    return undefined
  }

}

