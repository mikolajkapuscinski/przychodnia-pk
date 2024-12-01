import { TRPCError } from "@trpc/server";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export function assert(
  condition: any,
  message = "bad_request",
  code: TRPC_ERROR_CODE_KEY = "BAD_REQUEST",
): asserts condition {
  if (!condition) {
    throw new TRPCError({
      code,
      message,
    });
  }
}
