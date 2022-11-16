import * as pkg from '@prisma/client';

const { PrismaClient } = pkg;
const db = new PrismaClient();
export default db;