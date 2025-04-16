/* eslint-disable */
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import {
  DiseaseRegion,
  PrismaClient,
  Sex,
  UserRole,
  VisitStatus,
} from "@prisma/client";
import drugs from "./drugs.json" with { type: "json" };

const prisma = new PrismaClient();
const defaultUserIdx = "1";

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
    ...new Array(100).fill({ role: UserRole.DOCTOR }),
    ...new Array(5000).fill({ role: UserRole.PATIENT }),
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

const addMedicalHistory = async () => {
  const patients = await prisma.patient.findMany();
  const doctors = await prisma.doctor.findMany();

  const medicalHistories = new Array(100)
    .fill(patients)
    .flat()
    .map((patient) => ({
      patientId: patient.userId,
      doctorId:
        doctors[Math.floor(Math.random() * doctors.length)]?.userId ||
        defaultUserIdx,
      diseaseName: faker.lorem.words(2),
      region:
        Object.values(DiseaseRegion)[
          Math.floor(Math.random() * Object.values(DiseaseRegion).length)
        ] || "HEAD",
      diagnosisDate: faker.date.past(),
      recoveryDate: Math.random() > 0.5 ? faker.date.recent() : null,
    }));

  await prisma.medicalHistory.createMany({
    data: medicalHistories,
  });
};

const addOpinions = async () => {
  const patients = await prisma.patient.findMany();
  const doctors = await prisma.doctor.findMany();

  const opinions = patients.map((patient) => ({
    patientId: patient.userId,
    doctorId: doctors[Math.floor(Math.random() * doctors.length)]?.userId || defaultUserIdx,
    opinionText: faker.lorem.sentence(),
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  await prisma.opinion.createMany({
    data: opinions,
  });
};

const addVisits = async () => {
  const patients = await prisma.patient.findMany();
  const doctors = await prisma.doctor.findMany();

  const visits = new Array(10)
    .fill(patients)
    .flat()
    .map((patient) => ({
      patientId: patient.userId,
      doctorId: doctors[Math.floor(Math.random() * doctors.length)]?.userId || defaultUserIdx,
      title: faker.lorem.words(5),
      date: faker.date.future(),
      status:
        Object.values(VisitStatus)[
          Math.floor(Math.random() * Object.values(VisitStatus).length)
        ] || "FINISHED",
      prescription: JSON.stringify({
        recommendations: faker.lorem.sentence(3),
        diagnosis: faker.lorem.sentence(3),
        patientCondition: faker.lorem.sentence(1),
      }),
    }));

  await prisma.visit.createMany({
    data: visits,
  });

  const drugs = await prisma.drug.findMany();
  for (let i = 1; i < visits.length; i++) {
    const druga = drugs[Math.floor(Math.random() * drugs.length)]?.id;
    const drugb = drugs[Math.floor(Math.random() * drugs.length)]?.id;
    const out = [{ id: druga }];
    if (druga !== drugb) {
      out.push({ id: drugb });
    }

    const payload = {
      where: { id: i },
      data: { drugs: { connect: out } },
    };
    console.log(JSON.stringify(payload, null, 2));
    await prisma.visit.update(payload);
  }
};

const addSpecializations = async () => {
  const specializationArr = [
    "Cardiologist",
    "Dermatologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Gynecologist",
    "Hematologist",
    "Infectious Disease Specialist",
    "Internal Medicine Specialist",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedic Surgeon",
    "Otolaryngologist",
    "Pediatrician",
    "Physiatrist",
    "Plastic Surgeon",
    "Podiatrist",
    "Psychiatrist",
    "Pulmonologist",
    "Radiologist",
    "Rheumatologist",
  ];
  const doctors = await prisma.doctor.findMany();

  for (const s of specializationArr) {
    const sp = await prisma.specialization.create({
      data: { name: s },
    });

    await prisma.specialization.update({
      where: { id: sp.id },
      data: {
        doctor: {
          connect: doctors
            .filter(() => Math.random() > 0.85)
            .map((d) => ({ userId: d.userId })),
        },
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
  await add("drug", addDrugs);
  await add("user", addUsers);
  await add("medicalHistory", addMedicalHistory);
  await add("opinion", addOpinions);
  await prisma.visit.deleteMany();
  await add("visit", addVisits);
  await prisma.specialization.deleteMany();
  await add("specialization", addSpecializations);
  await prisma.$disconnect();
};
main();
