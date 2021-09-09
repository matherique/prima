export interface TokenService {
  create(payload: any): Promise<string>
}
