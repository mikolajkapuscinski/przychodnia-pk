export function assert(
  condition: any,
  message = "bad_request",
  Exception = Error,
): asserts condition {
  if (!condition) {
    throw new Exception(message);
  }
}
