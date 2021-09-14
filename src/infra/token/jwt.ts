import { TokenService } from "@/modules/user/usercases/ports/token-service";
import jsonwebtoken from 'jsonwebtoken'

export class JWT implements TokenService {
  constructor(private readonly secret: any) {}

  async verify(token: string): Promise<string | object> {
    const payload = jsonwebtoken.verify(token, this.secret)

    return payload
  }

  async create(payload: any, expiresIn: number): Promise<string> {
    return jsonwebtoken.sign(payload, this.secret, { expiresIn })
  }

}
