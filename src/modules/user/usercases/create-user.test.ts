import { CreateUserUsecase } from "./create-user";
import { CreateUserRepository, CreateUserRepositoryParams, UserModel } from "./ports/create-user-repository";

class CreateUserRepositorySpy implements CreateUserRepository {
  public saveCount: number = 0;
  public saveParams: CreateUserRepositoryParams
  public saveReturn: UserModel

  async save(data: CreateUserRepositoryParams): Promise<UserModel | null> {
    this.saveCount++;
    this.saveParams = data

    return this.saveReturn
  }
}

function makeSut() {
  const repositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateUserUsecase(repositorySpy)

  return { repositorySpy, sut }
}

describe("Create user", () => {
  const userData = {
    firstName: 'any_firstname',
    lastName: 'any_lastname',
    email: 'any_email@email.com',
  }

  it("should call save on sut.create", async () => {
    const { repositorySpy, sut } = makeSut()

    await sut.create(userData)
    expect(repositorySpy.saveCount).toBe(1)
  })
  
  it("should call save with corret params", async () => {
    const { repositorySpy, sut } = makeSut()
    await sut.create(userData)
    expect(repositorySpy.saveCount).toBe(1)
    expect(repositorySpy.saveParams).toEqual(userData)
  })

  it("should return a new user with corret params", async () => {
    const { repositorySpy, sut } = makeSut()

    repositorySpy.saveReturn = { 
      ...userData, 
      id: 1, 
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const result = await sut.create(userData)
    expect(repositorySpy.saveCount).toBe(1)
    expect(repositorySpy.saveReturn).toEqual(result)
  })

  it("should validate and return null if email alreaby been used", async () => {
    const { repositorySpy, sut } = makeSut()

    jest.spyOn(repositorySpy, 'save').mockImplementation(() => {
      repositorySpy.saveCount += 1
      return null
    })

    const result = await sut.create(userData)
    expect(result).toBeNull()
    expect(repositorySpy.saveCount).toBe(1)
  })

})
