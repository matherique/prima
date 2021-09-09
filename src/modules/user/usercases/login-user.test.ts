import { User } from ".prisma/client"
import { LoginUser } from "./login-user"
import { FindByEmailRepository } from "./ports/find-by-email-repository"
import { HashingService } from "./ports/hashing-service"

class HashingSpy implements HashingService {
  public compareCount = 0;
  public compareReturn: boolean 

  async compare(value: string, hashed: string): Promise<boolean> {
    this.compareCount += 1
    return this.compareReturn
  }
}

class FindByEmailRepositorySpy implements FindByEmailRepository {
  public findCallCount = 0
  public findEmail: string
  public findResponse: User|null

  async find(email: string): Promise<User|null> {
    this.findCallCount += 1
    this.findEmail = email
    return this.findResponse
  }
}

const makeSut = () => {
  const repositorySpy = new FindByEmailRepositorySpy()
  const hashingSpy = new HashingSpy()
  const sut = new LoginUser(repositorySpy, hashingSpy)

  return { 
    sut,
    repositorySpy,
    hashingSpy,
  }
}

describe("#Login user", () => {
  const db_user: User = {
    id: 1,
    firstName: 'any_firtsname',
    lastName: 'any_firtsname',
    email: 'any_email',
    password: 'any_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  test("should return null if a unregister email was given", async () => {
    const loginData = {
      email: 'any_email',
      password: 'any_password'
    }

    const { sut, repositorySpy } = makeSut()
    repositorySpy.findResponse = null

    await sut.login(loginData)
    expect(repositorySpy.findCallCount).toBe(1)
    expect(repositorySpy.findEmail).toBe(loginData.email)
    expect(repositorySpy.findResponse).toBe(null)
  })

  test("should compare the given password and the founded in database", async () => {
    const loginData = {
      email: 'any_email',
      password: 'any_password'
    }

    const { sut, repositorySpy, hashingSpy } = makeSut()

    repositorySpy.findResponse = db_user;

    await sut.login(loginData)

    expect(hashingSpy.compareCount).toBe(1)
  })

  test("should return null if the password is incorret", async () => {
    const loginData = {
      email: 'any_email',
      password: 'any_password'
    }

    const { sut, repositorySpy, hashingSpy } = makeSut()

    repositorySpy.findResponse = db_user;
    hashingSpy.compareReturn = false

    const response = await sut.login(loginData)
    expect(repositorySpy.findEmail).toBe(loginData.email)
    expect(repositorySpy.findResponse).toBe(db_user)
    expect(response).toBe(null)
  })

  test.todo("should create a token within the user id")
})
