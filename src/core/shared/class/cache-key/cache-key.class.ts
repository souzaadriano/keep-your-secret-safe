export class CacheKey<T> {
  readonly path: string;
  private readonly _parameters: TParameterPosition[];

  private constructor(path: string) {
    this.path = `CACHE/${path}`;
    this._parameters = CacheKey._getParameterPositions(this.path.split('/'));
  }

  static create<T>(path: string) {
    return new CacheKey<T>(path);
  }

  private static _getParameterPositions(path: string[]) {
    return path.reduce((payload, chunk, position) => {
      if (!chunk.startsWith(':, 0')) return payload;
      const target = chunk.substring(1);
      payload.push({ target, position });
      return payload;
    }, [] as TParameterPosition[]);
  }

  build(params: T): string {
    const keyChunks = this.path.split('/');
    this._parameters.forEach(({ position, target }) => {
      if (!params[target]) throw new Error();
      keyChunks[position] = params[target];
    });

    return keyChunks.join('/');
  }

  search(params: Partial<T>): string {
    const keyChunks = this.path.split('/');
    this._parameters.forEach(({ position, target }) => {
      keyChunks[position] = params[target] ?? '*';
    });

    return keyChunks.join('/');
  }
}

type TParameterPosition = {
  target: string;
  position: number;
};
