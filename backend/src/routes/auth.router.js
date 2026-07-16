import { Router } from "express";
import bcrypt from "bcrypt"
import path from 'path';
import { fileURLToPath } from 'url';

import { PrismaClient } from '@prisma/client';
// local sqlite
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../prisma/dev.db');

const sqlite = new Database(dbPath);

const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`
  });
const prisma = new PrismaClient({ adapter });

// for turso
// import { createClient } from '@libsql/client';
// import { PrismaLibSQL } from '@prisma/adapter-libsql';

// const libsql = createClient({
//   url: process.env.DATABASE_URL,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });
// const adapter = new PrismaLibSQL(libsql);

const router = Router()

router.post('/api/register', async (req, res) => {
    const {username, password, email} = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ error: "All profile fields are required." });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username or Email already registered." });
        }

        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)

        const newUser = await prisma.user.create ({
            data : {
                username: username,
                password: hashedPassword,
                email: email,
            }
        })

        return res.status(201).json({
            success: true,
            message: "User created",
            userId: newUser.id
        })

    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Internal server anomaly occurred during save." });
    }
})

export default router