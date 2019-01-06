export type UseCase<Input, Output> = Input extends Array<any>
  ? (...args: Input) => Promise<Output>
  : Input extends void
  ? () => Promise<Output>
  : (input: Input) => Promise<Output>;

export type UseCaseContext = any;

export interface UseCaseFactory<
  U extends UseCase<any, any>,
  C extends UseCaseContext
> {
  (context: C): U;
}
