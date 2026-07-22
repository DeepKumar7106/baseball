import { Router } from "express";
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma.js";

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
                username: username 
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username already registered." });
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

router.post('/api/login', async (req, res) => {
    // destructuring the data from the frontend
    const { username, password} = req.body
    
    console.log(req.body)

    // checking for the fields to contain data
    if (!username || !password) {
        return res.status(400).json({ error: "All profile fields are required." });
    }
    
    try {
        // fetch the username to check with the user has registered
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // if the user does not exist, send back error msg to frontend
        if (!user) {
            return res.status(404).json({error: "The user does not exist!"})
        }
        
        // check the password whether it is correct or not
        const checkPW = await bcrypt.compare(password, user.password)

        if (!checkPW) {
            return res.status(400).json({error: "Username or password is incorrect!"})
        }

        // if everything matches log the user in
        console.log("User is logged in")
    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Internal server anomaly occurred during save." });
    }

})

export default router