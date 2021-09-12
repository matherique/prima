export interface TokenService {
  create(payload: any, expiresIn: number): Promise<string>
}
