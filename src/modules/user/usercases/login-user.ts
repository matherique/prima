import { LoginUserUsecase, LoginUserUsecaseParams, LoginUserUsecaseResult } from "../domain/usecases/login-user";
import { FindByEmailRepository } from "./ports/find-by-email-repository";

export class LoginUser implements LoginUserUsecase {
  constructor(private readonly findByEmailRepository: FindByEmailRepository) {}

  async login({ email }: LoginUserUsecaseParams): Promise<LoginUserUsecaseResult> {
    const user = await this.findByEmailRepository.find(email)
    return null
  }

}

