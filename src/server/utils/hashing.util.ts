import bcrypt from "bcrypt";

export const hash = async (secret: string) => {
  return bcrypt.hash(secret, 10);
};

export const compare = async (secret: string, hash: string) => {
  return bcrypt.compare(secret, hash);
};
