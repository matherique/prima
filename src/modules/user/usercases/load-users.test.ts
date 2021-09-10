import { User } from "@prisma/client"
import { LoadUser } from "./load-users"
import { FindAllRepository } from "./ports/find-all-repository"

class FindAllRepositorySpy implements FindAllRepository {
  public response: User[]
  async findAll(): Promise<User[]> {
    return this.response
  }
}

const makeSut = () => {
  const repositorySpy = new FindAllRepositorySpy()
  const sut = new LoadUser(repositorySpy)

  return {
    sut, 
    repositorySpy,
  }
}

describe("Load users", () => {
  const user: User = { 
    id: 1, 
    firstName: 'any_firstname', 
    lastName: 'any_lastName', 
    email: 'any_email@email.com',
    password: 'any_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  test("should return a empty list if no user was founded", async () => {
    const { repositorySpy, sut } = makeSut()

    repositorySpy.response = []
    const response = await sut.load();

    expect(response).toEqual([])
  })

  test("should remove password from the result", async () => {
    const { repositorySpy, sut } = makeSut()
    
    repositorySpy.response = [user]   

    const response = await sut.load();
    const expectResponse = { ...user }
    delete expectResponse.password
    expect(response).toEqual([expectResponse])
  })

  test("should return a list of users", async () => {
    const { repositorySpy, sut } = makeSut()
    
    repositorySpy.response = [user]   

    const response = await sut.load();
    expect(response[0]).not.toHaveProperty("password")
  })
})
