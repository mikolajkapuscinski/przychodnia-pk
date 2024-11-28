import { type User } from "next-auth";
import { findUserByEmail } from "./user.access";
import { compare } from "~/server/utils/hashing.util";

export const authorize = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isMatch = await compare(password, user.passwordHash);
  if (!isMatch) {
    return null;
  }

  return {
    id: user.id,
    name: user.firstName,
    email: user.email,
    role: user.role,
  };
};
