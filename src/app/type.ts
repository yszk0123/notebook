export type UseCase<Input, Output> = Input extends Array<any>
  ? (...args: Input) => Promise<Output>
  : Input extends void
  ? () => Promise<Output>
  : (input: Input) => Promise<Output>;

export type UseCaseContext = any;
