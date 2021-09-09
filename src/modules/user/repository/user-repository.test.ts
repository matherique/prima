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

    test("should call create and return new user data", async () => {
      const sut = new UserRepository(mockPrisma)

      mockPrisma.user.findUnique.mockResolvedValueOnce(null)
      mockPrisma.user.create.mockResolvedValueOnce(insertedUser)

      const resp = await sut.save(userData)

      expect(resp).toEqual(insertedUser)
    })
    
    test("should return null if email already been used", async () => {
      const sut = new UserRepository(mockPrisma)
      mockPrisma.user.findUnique.mockResolvedValueOnce(insertedUser)
      const resp = await sut.save(userData)

      expect(resp).toEqual(null)
    })
  })

  describe("#findByEmail", () => {
    const insertedUser = {
      id: 1,
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      email: 'any_email',
      password: 'any_password',
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    test("should return a valid user if email it was registered", async () => {
      const sut = new UserRepository(mockPrisma)
      mockPrisma.user.findUnique.mockResolvedValueOnce(insertedUser)
      const resp = await sut.findByEmail(insertedUser.email)
      expect(resp).toEqual(insertedUser)
    })

    test("should return null if unregistered email it was provided", async () => {
      const sut = new UserRepository(mockPrisma)
      mockPrisma.user.findUnique.mockResolvedValueOnce(null)
      const resp = await sut.findByEmail('unregistered_email')
      expect(resp).toEqual(null)
    })
  })
})

