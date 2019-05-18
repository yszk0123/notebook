/**
 * Suppress annoying error messages
 * https://github.com/GeekyAnts/NativeBase/issues/2176
 */
const error = console.error;

console.error = function wrappedWarn() {
  if (
    arguments.length > 2 &&
    typeof arguments[0] === 'string' &&
    arguments[0].startsWith('Warning: Received `%s` for a non-boolean attribute `%s`')
  ) {
    return;
  }

  return error.apply(this, arguments);
};
