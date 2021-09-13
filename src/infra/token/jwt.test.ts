import { JWT } from "./jwt"
import jsonwebtoken from 'jsonwebtoken'

describe("Jsonwebtoken", () => {
  const secret = 'secret'

  test("should return a valid token", async () => {
    const jwt = new JWT(secret)
    const fakeToken = "random_token"

    jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => fakeToken)
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

    jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => fakeToken)
    await jwt.create(params.payload, params.options.expiresIn)
    
    expect(jsonwebtoken.sign).toHaveBeenCalledWith(...Object.values(params))
  })
})
