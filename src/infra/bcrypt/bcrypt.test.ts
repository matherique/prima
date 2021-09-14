import { Bcrypt } from "./bcrypt";

describe("Bcrypt", () => {
  const salt = 10

  test("should encode and decode the password corretly", async () => {
    const sut = new Bcrypt(salt);
    const password = 'any_password'
    const hashed = await sut.encode(password);

    const isEqual = await sut.compare(password, hashed)
    expect(isEqual).toBeTruthy()
  })

  test("should return false if password not match", async () => {
    const sut = new Bcrypt(salt);
    const password = 'any_password'
    const hashed = await sut.encode(password);

    const other_password = 'wrong_password'
    const isEqual = await sut.compare(other_password, hashed)
    expect(isEqual).toBeFalsy()
  })
})
