import { BearerToken } from './bearer-token.class';

export abstract class TokenFactory {
  static bearer(token: string) {
    return new BearerToken(token);
  }
}
