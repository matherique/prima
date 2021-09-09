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
      password: "any_password",
      email: "any_email@email.com"
    }

    const insertedUser = {
      ...userData,
      id: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    it("should call create and return new user data", async () => {
      const repo = new UserRepository(mockPrisma)

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(insertedUser)

      const resp = await repo.save(userData)

      expect(resp).toEqual(insertedUser)
    })
    
    it("should return null if email already been used", async () => {
      const repo = new UserRepository(mockPrisma)
      mockPrisma.user.findUnique.mockResolvedValue(insertedUser)
      const resp = await repo.save(userData)

      expect(resp).toEqual(null)
    })
  })
})

