import { action as originalAction } from './DucksType';

export function action<Type extends string>(type: Type) {
  return <Payload = void>() => originalAction<Type, Payload>(type);
}
