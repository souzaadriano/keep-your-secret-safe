export interface IHashHandler {
  make(value: string): Promise<string>;
  validate(value: string, hash: string): Promise<boolean>;
}
