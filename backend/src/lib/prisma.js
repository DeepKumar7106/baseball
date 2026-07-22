import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
// local sqlite
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// make sure the prisma config file and studio file url are directing to following file

const dbPath = path.resolve(__dirname, '../../prisma/dev.db');

// const sqlite = new Database(dbPath);

const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`
  });
export const prisma = new PrismaClient({ adapter });

// for turso
// import { createClient } from '@libsql/client';
// import { PrismaLibSQL } from '@prisma/adapter-libsql';

// const libsql = createClient({
//   url: process.env.DATABASE_URL,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });
// const adapter = new PrismaLibSQL(libsql);