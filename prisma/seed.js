/* eslint-disable */
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient, Sex, UserRole } from "@prisma/client";
import drugs from "./drugs.json" with { type: "json" };

const prisma = new PrismaClient();

const addDrugs = async () => {
  // cat drug-ndc-0001-of-0001.json| jq -c '.results[] | { n: .generic_name, p: .packaging[0].description, df: .dosage_form }' | jq -s > drugs.json

  await prisma.drug.createMany({
    data: drugs
      // @ts-ignore
      .map((d) => {
        return {
          name: d.n || ``,
          description: `Dosage form: ${d.df}\nPackaging: ${d.p}`,
        };
      })
      // @ts-ignore
      .filter((d) => d.name && d.description),
  });
};

const fakePesel = () => {
  return faker.finance.accountNumber(11);
};

const addUsers = async () => {
  const passwordHash = await bcrypt.hash("password", 10);

  const users = [
    {
      firstName: "Szymon",
      lastName: "Przychodnia",
      email: "szymon@przychodnia.com",
      role: UserRole.ADMIN,
    },
    {
      firstName: "Michael",
      lastName: "Apple",
      email: "michael@apple.com",
      role: UserRole.RECEPTIONIST,
    },
    {
      role: UserRole.ACCOUNTANT,
      sex: Sex.NON_BINARY,
    },
    ...new Array(10).fill({ role: UserRole.DOCTOR }),
    ...new Array(20).fill({ role: UserRole.PATIENT }),
  ];

  await prisma.user.createMany({
    data: users.map((user) => {
      return {
        ...user,
        firstName: user.firstName ?? faker.person.firstName(),
        lastName: user.lastName ?? faker.person.lastName(),
        email: user.email ?? faker.internet.email().toLowerCase(),
        passwordHash,
        role: user.role ?? UserRole.PATIENT,
        pesel: user.pesel ?? fakePesel(),
        sex: (user.sex ?? Math.random() > 0.5) ? Sex.MALE : Sex.FEMALE,
        image: user.image ?? faker.image.avatar(),
      };
    }),
  });

  const doctors = await prisma.user.findMany({
    where: { role: UserRole.DOCTOR },
  });
  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: {
        userId: doctor.id,
      },
    });
  }

  const patients = await prisma.user.findMany({
    where: { role: UserRole.PATIENT },
  });
  for (const patient of patients) {
    await prisma.patient.create({
      data: {
        userId: patient.id,
      },
    });
  }
};

// @ts-ignore
const add = async (table, generator) => {
  // @ts-ignore
  const count = await prisma[table].count();
  if (count > 0) {
    console.log(`${table}: already seeded`);
    return;
  }
  console.log(`${table}: seeding...`);

  await generator();

  console.log(`${table}: seeding complete`);
};

const main = async () => {
  await Promise.all([add("drug", addDrugs), add("user", addUsers)]);
  await prisma.$disconnect();
};
main();
