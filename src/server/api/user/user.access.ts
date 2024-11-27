import { type UserRole } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils/hashing.util";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const createUser = async (createUser: CreateUser) => {
  const user = await db.user.create({
    data: {
      name: createUser.name,
      email: createUser.email,
      passwordHash: await hash(createUser.password),
    },
  });

  return user.id;
};

export const findUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};
