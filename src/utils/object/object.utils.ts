export abstract class ObjectUtils {
  static hasProps(target: object): boolean {
    const properties = Object.getOwnPropertyNames(target);
    return properties.length ? true : false;
  }
}
