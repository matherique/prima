import { JWT } from "./jwt"
import jsonwebtoken from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn()
  }
})

const mockedJsonwebtoken = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>

describe("Jsonwebtoken", () => {
  const secret = 'secret'

  test("should return a valid token", async () => {
    const jwt = new JWT(secret)
    const fakeToken = "random_token"
    mockedJsonwebtoken.sign.mockImplementationOnce(() => fakeToken)
    const token = await jwt.create({ random: 'payload' }, 1)

    expect(token).toBe(fakeToken)
  })

  test("should call sign with the corrent secret and payload", async () => {
    const jwt = new JWT(secret)
    const fakeToken = "random_token"

    const params = {
      payload: { random: 'payload' },
      secret, 
      options: { expiresIn: 1 }
    }

    mockedJsonwebtoken.sign.mockImplementationOnce(() => fakeToken)
    await jwt.create(params.payload, params.options.expiresIn)

    
    expect(mockedJsonwebtoken.sign).toHaveBeenCalledWith(...Object.values(params))
  })
})
