export abstract class ArrayUtils {
  static lastItem<T>(array: T[]): T | undefined {
    const lastIndex = array.length - 1;
    return array[lastIndex];
  }

  static splitInChunks<T>(input: T[], size: number): T[][] {
    input.reduce()
  }
}
