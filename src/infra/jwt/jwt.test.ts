import { JWT } from "./jwt";

describe("JWT", () => {
  const secret = "secret";

  test("should create and validate token", async () => {
    const jwt = new JWT(secret);
    const token = await jwt.create({ random: "payload" }, 1);
    const payload = await jwt.verify(token);

    expect(payload).toHaveProperty("random");
  });

  test("should throw and erro if token is invalid", async () => {
    const jwt = new JWT(secret);
    const token = await jwt.create({ random: "payload" }, 1);

    const modifiedToken = token + "_trash";
    const promise = jwt.verify(modifiedToken);

    expect(promise).rejects.toThrow();
  });
});
