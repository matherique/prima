import { LoginUserUsecase, LoginUserUsecaseParams, LoginUserUsecaseResult } from "../domain/usecases/login-user";
import { FindByEmailRepository } from "./ports/find-by-email-repository";
import { HashingService } from "./ports/hashing-service";
import { TokenService } from "./ports/token-service";

export class LoginUser implements LoginUserUsecase {
  constructor(
    private readonly findByEmailRepository: FindByEmailRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ email, password }: LoginUserUsecaseParams): Promise<LoginUserUsecaseResult> {
    const user = await this.findByEmailRepository.findByEmail(email)

    if (!user) {
      return null
    }
      
    const isCorretPassword = await this.hashingService.compare(password, user.password)

    if (!isCorretPassword) { 
      return null
    }
    
    const expires = 2 * 60 * 60 // 2h 
    const token = await this.tokenService.create({ id: user.id }, expires)

    return { token }
  }

}

