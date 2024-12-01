import { UserRole, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils/hashing.util";

type CreateUser = Omit<Prisma.UserCreateInput, "passwordHash"> & {
  password: string;
};

const PUBLIC_USER_FIELDS = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
} as const satisfies Prisma.UserSelect;

export const createUser = async (createUser: CreateUser) => {
  const user = await db.user.create({
    data: {
      ...createUser,
      passwordHash: await hash(createUser.password),
    },
  });

  return user.id;
};

export const findUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};

export const findPublicUserByPesel = (pesel: string) => {
  return db.user.findUnique({
    where: { pesel },
    select: PUBLIC_USER_FIELDS,
  });
};

export const findDoctors = async () => {
  const users = await db.user.findMany({
    where: { role: UserRole.DOCTOR },
    select: {
      ...PUBLIC_USER_FIELDS,
      doctor: {
        select: {
          specialization: true,
        },
      },
    },
  });

  return users.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      specialization: user.doctor?.specialization.map((spec) => spec.name),
    };
  });
};
