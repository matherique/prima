import { CreateUserUsecase } from "./create-user";
import { CreateUserRepository, CreateUserRepositoryParams, CreateUserRepositoryResult } from "./ports/create-user-repository";
import { HashingService } from "./ports/hashing-service";

class CreateUserRepositorySpy implements CreateUserRepository {
  public saveCount: number = 0;
  public saveParams: CreateUserRepositoryParams
  public saveReturn: CreateUserRepositoryResult

  async save(data: CreateUserRepositoryParams): Promise<CreateUserRepositoryResult> {
    this.saveCount++;
    this.saveParams = data

    return this.saveReturn
  }
}

class HashingSpy implements HashingService {
  public encodeResult: string
  public encodeCallCount: number = 0

  async compare(_value: string, _hashed: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async encode(value: string): Promise<string> {
    this.encodeCallCount += 1
    return this.encodeResult
  }

}

function makeSut() {
  const hashingSpy = new HashingSpy()
  const repositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateUserUsecase(repositorySpy, hashingSpy)

  return { repositorySpy, sut, hashingSpy }
}

describe("Create user", () => {
  const userData = {
    firstName: 'any_firstname',
    lastName: 'any_lastname',
    password: 'any_password',
    email: 'any_email@email.com',
  }

  it("should call save on sut.create", async () => {
    const { repositorySpy, sut } = makeSut()

    await sut.create(userData)
    expect(repositorySpy.saveCount).toBe(1)
  })
  
  it("should call save with corret params", async () => {
    const { repositorySpy, sut, hashingSpy } = makeSut()
    hashingSpy.encodeResult = 'hashed_password'
    await sut.create(userData)
    expect(repositorySpy.saveCount).toBe(1)
    expect(repositorySpy.saveParams).toEqual({ ...userData, password: 'hashed_password' })
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

    repositorySpy.saveReturn = null

    const result = await sut.create(userData)
    expect(result).toBeNull()
    expect(repositorySpy.saveCount).toBe(1)
  })

  it("should call encode to create a hashed password", async () => {
    const { repositorySpy, sut, hashingSpy } = makeSut()
    const insertedUser = {
      ...userData,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    repositorySpy.saveReturn = insertedUser

    const result = await sut.create(userData)

    expect(result).toEqual(insertedUser)
    expect(repositorySpy.saveCount).toBe(1)
    expect(hashingSpy.encodeCallCount).toBe(1)

  })
})
