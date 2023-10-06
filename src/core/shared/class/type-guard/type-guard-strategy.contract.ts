export interface ITypeGuardStrategy<TYPES, INPUT, OUTPUT> {
  readonly type: TYPES;
  handle(input: INPUT): Promise<OUTPUT>;
}
