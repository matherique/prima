export interface HashingService {
  compare(value: string, hashed: string): Promise<boolean>
  encode(value: string): Promise<string>
}

