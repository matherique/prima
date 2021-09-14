import { HashingService } from '@/modules/user/usercases/ports/hashing-service'
import { compare, hash } from 'bcryptjs'

export class Bcrypt implements HashingService {
  constructor(private readonly salt: number) {}

  async compare(value: string, hashed: string): Promise<boolean> {
    return compare(value, hashed)
  }

  async encode(value: string): Promise<string> {
    return hash(value, this.salt)
  }
}
