import { LoadUserInfoResponse, LoadUserInfoUsecase, LoadUserInfoUsecaseParams } from "../domain/usecases/load-user-info"
import { LoadUserInfoRepository } from "./ports/load-user-info-repository"

export class LoadUserInfo implements LoadUserInfoUsecase {
  constructor(private readonly loadUserInfoRepository: LoadUserInfoRepository) {}

  async load(id: LoadUserInfoUsecaseParams): Promise<LoadUserInfoResponse> {
    const user = await this.loadUserInfoRepository.find(id)

    if (!user) {
      return null
    }

    return user
  }
}

