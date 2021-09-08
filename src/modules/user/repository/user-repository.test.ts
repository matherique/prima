import { mocked } from 'ts-jest/utils';
import { UserRepository } from "./user-repository"
import db from '../../../config/database'

jest.mock('../../../config/database', () => {
  return {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };
});

describe("User repository", () => {
  const mockPrisma = mocked(db, true)

  beforeEach(() => {
    mockPrisma.user.create.mockClear()
  })

  describe("#save", () => {
    const userData = {
      firstName: "any_firstName",
      lastName: "any_lastName",
      email: "any_email@email.com"
    }

    it("should call create and return new user data", async () => {
      const repo = new UserRepository(mockPrisma)
      const createdResponse = {
        ...userData,
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      }

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(createdResponse)

      const resp = await repo.save(userData)

      expect(resp).toEqual(createdResponse)
    })
    
    it.todo("should return null if email already been used")
  })
})

