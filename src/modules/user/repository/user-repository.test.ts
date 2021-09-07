import { UserRepository } from "./user-repository"
import database from '../../../config/database'

jest.mock('../../../config/database', () => {
  return {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };
});


const makeSut = () => {
  const mocked = database as jest.Mocked<typeof database>
  const repo = new UserRepository(mocked)

  return { repo, prisma: mocked }
}

describe("User repository", () => {
  describe("#save", () => {
    const userData = {
      firstName: "any_firstName",
      lastName: "any_lastName",
      email: "any_email@email.com"
    }

    it("should call create and return new user data", async () => {
      const { repo, prisma } = makeSut()
      const createdResponse = {
        ...userData,
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      }

      // TODO: fix this type problem
      // @ts-ignore
      prisma.user.findUnique.mockResolvedValue(null)
      
      // @ts-ignore
      prisma.user.create.mockResolvedValue(createdResponse)

      const resp = await repo.save(userData)

      expect(resp).toEqual(createdResponse)
    })
    
    it.todo("should return null if email already been used")
  })
})

