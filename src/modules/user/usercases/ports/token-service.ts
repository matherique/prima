export interface TokenService {
  create(payload: any, expiresIn: number): Promise<string>
  verify(token: string): Promise<string | object>
}
