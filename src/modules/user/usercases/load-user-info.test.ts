import { User } from "../domain/models/user"
import { LoadUserInfoResponse, LoadUserInfoUsecase, LoadUserInfoUsecaseParams } from "../domain/usecases/load-user-info"

interface LoadUserInfoRepository { 
  find(id: number): Promise<Omit<User, "password"> | null>
}

class LoadUserInfo implements LoadUserInfoUsecase {
  constructor(private readonly loadUserInfoRepository: LoadUserInfoRepository) {}

  async load(id: LoadUserInfoUsecaseParams): Promise<LoadUserInfoResponse> {
    const user = await this.loadUserInfoRepository.find(id)

    if (!user) {
      return null
    }

    return user
  }
}

class LoadUserInfoRepositorySpy implements LoadUserInfoRepository {
  public findParam: number
  public findResponse: Omit<User, "password"> | null

  async find(id: number): Promise<Omit<User, "password"> | null> {
    this.findParam = id

    return this.findResponse
  }

}

const makeSut = () => {
  const spy = new LoadUserInfoRepositorySpy()
  const sut = new LoadUserInfo(spy)
  return {
    sut,
    spy
  }
}

describe("Load user info", () => {
  test("should return null if not found a user with especific id", async () => {
    const id = 10
    const { sut, spy } = makeSut()
    spy.findResponse = null
    const resp = await sut.load(id)

    expect(resp).toBeNull()
    expect(spy.findParam).toBe(id)
  })

  test("should return a valid user without password", async () => {
    const id = 10
    const { sut, spy } = makeSut()
    spy.findResponse = { 
      id: 1, 
      firstName: 'any_firstname', 
      lastName: 'any_lastName', 
      email: 'any_email@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const resp = await sut.load(id)
    expect(resp).not.toHaveProperty("password")
  })
})
