export type LoginUserUsecaseParams = {
  email: string
  password: string
}

export type LoginUserUsecaseResult = {
  token: string
}

export interface LoginUserUsecase {
  login(params: LoginUserUsecaseParams): Promise<LoginUserUsecaseResult>
}


