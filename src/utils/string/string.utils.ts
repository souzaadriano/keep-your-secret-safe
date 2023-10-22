export abstract class StringUtils {
  static capitalize(input: string) {
    const first = input.charAt(0).toUpperCase();
    return `${first}${input.substring(1)}`;
  }

  static capitalizeAll(value: string, step?: string) {
    return value
      .split(step ?? ' ')
      .map((chunk) => StringUtils.capitalize(chunk))
      .join(step ?? ' ');
  }
}
