import { TokenService } from "@/modules/user/usercases/ports/token-service";
import jsonwebtoken from 'jsonwebtoken'

export class JWT implements TokenService {
  constructor(private readonly secret: any) {}

  async create(payload: any, expiresIn: number): Promise<string> {
    return jsonwebtoken.sign(payload, this.secret, { expiresIn })
  }
}
