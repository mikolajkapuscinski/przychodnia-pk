import { UserRole, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils/hashing.util";
import { assert } from "~/utils/assert";

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
  const data: Prisma.UserCreateInput = {
    ...createUser,
    passwordHash: await hash(createUser.password),
  };

  if (createUser.role == UserRole.DOCTOR) {
    data.doctor = {
      create: {},
    };
  } else if (createUser.role == UserRole.PATIENT) {
    data.patient = {
      create: {},
    };
  }

  const user = await db.user.create({
    data,
  });

  return user.id;
};

export const findUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  assert(user, "User not found");

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  assert(user, "User not found");

  return user;
};

export const findPublicUserByPesel = (pesel: string) => {
  const user = db.user.findUnique({
    where: { pesel },
    select: PUBLIC_USER_FIELDS,
  });
  assert(user, "User not found");

  return user;
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
      specialization: user.doctor?.specialization ?? [],
    };
  });
};

export const updateUser = async (
  userId: string,
  updatedUser: Prisma.UserUpdateInput,
) => {
  const user = await db.user.update({
    where: { id: userId },
    data: updatedUser,
    select: { id: true },
  });
  assert(user, "User not found");

  return user.id;
};

export const updatePassword = async (userId: string, password: string) => {
  const user = await db.user.update({
    where: { id: userId },
    data: {
      passwordHash: await hash(password),
    },
    select: { id: true },
  });
  assert(user, "User not found");

  return user.id;
};
