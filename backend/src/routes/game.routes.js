import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

// data uploaded to game table
// game needs winning player id
router.post('/api/game', async (req, res) => {
    const { winningPlayerId } = req.body

    if (!winningPlayerId) {
        return res.status(400).json({ error : "Winning player id is required" })
    }
    
    try {
        // all data validated
        // check whether user exist?
        const existingUser = await prisma.user.findFirst({
            where : {
                id : winningPlayerId
            }
        })
        
        if (!existingUser) {
            return res.status(400).json({ error : "No such player exists" })
        }

        // user is valid
        const newGame = await prisma.game.create ({
            data: {
                winningPlayerID : winningPlayerId,
            }
        })

        return res.status(201).json({
            success : true,
            message : "Game details uploaded",
        })

    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Internal server anomaly occurred during save." }); 
    }
})

export default router