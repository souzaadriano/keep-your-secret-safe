export interface IHashHandler {
  hash(password: string): Promise<string>;
  validate(hash: string, value: string): Promise<boolean>;
}
