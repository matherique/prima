type User = {
  firstName: string
  lastName: string
  email: string
}

interface CreateUser {
  create: () => Promise<void>
}

class CreateUserUsecase implements CreateUser {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(): Promise<void> {
    return await this.createUserRepository.save()
  }
}

interface CreateUserRepository {
  save: () => Promise<void>
}

class CreateUserRepositorySpy implements CreateUserRepository {
  public saveCount: number = 0;

  async save(): Promise<void> {
    this.saveCount++;
  }
}

function makeSut() {
  const repositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateUserUsecase(repositorySpy)

  return { repositorySpy, sut }
}

describe("Create user", () => {
  it("should call save on sut.create", async () => {
    const { repositorySpy, sut } = makeSut()

    await sut.create()
    expect(repositorySpy.saveCount).toBe(1)
  })

})
