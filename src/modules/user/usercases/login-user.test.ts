import { User } from ".prisma/client"
import { LoginUser } from "./login-user"
import { FindByEmailRepository } from "./ports/find-by-email-repository"

class FindByEmailRepositorySpy implements FindByEmailRepository {
  public findCallCount = 0
  public findEmail: string
  public findResponse: User|null = null

  async find(email: string): Promise<User|null> {
    this.findCallCount += 1
    this.findEmail = email
    return this.findResponse
  }
}

const makeSut = () => {
  const repositorySpy = new FindByEmailRepositorySpy()
  const sut =  new LoginUser(repositorySpy)

  return { 
    sut,
    repositorySpy
  }
}

describe("#Login user", () => {
  test("should return null if a unregister email was given", async () => {
    const loginData = {
      email: 'any_email',
      password: 'any_password'
    }

    const { sut, repositorySpy } = makeSut()

    await sut.login(loginData)
    expect(repositorySpy.findCallCount).toBe(1)
    expect(repositorySpy.findEmail).toBe(loginData.email)
    expect(repositorySpy.findResponse).toBe(null)
  })

  test.todo("should return null if the password is incorret")
  test.todo("should compare the given password and the founded in database")
  test.todo("should create a token within the user id")
})
