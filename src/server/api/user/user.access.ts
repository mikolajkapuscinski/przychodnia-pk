import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils/hashing.util";

type CreateUser = Omit<Prisma.UserCreateInput, "passwordHash"> & {
  password: string;
};

export const createUser = async (createUser: CreateUser) => {
  const user = await db.user.create({
    data: {
      ...createUser,
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
