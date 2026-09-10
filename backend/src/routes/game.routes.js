import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

// data uploaded to game table
// game needs winning player id
router.post('/', async (req, res) => {
    const { winningPlayerId } = req.body

    if (!winningPlayerId) {
        return res.status(400).json({ error : "Winning player id is required" })
    }
    
    try {
        // all data validated
        // check whether user exist?
        const isPlayer = await prisma.user.findFirst({
            where : {
                id : winningPlayerId
            }
        })
        
        if (!isPlayer) {
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
            gameID : newGame.id,
        })
        
    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Internal server anomaly occurred during save." }); 
    }
})

// uploading scores
router.post('/score', async (req, res) => {
    const { playerID, gameID, inningNumber, ballsPlayed, totalScore } = req.body
    
    if (!playerID || !gameID || !inningNumber || !ballsPlayed || !totalScore) {
        return res.status(400).json({ error : "Score data is missing" })
    }
    
    try {
        // check if the player exist
        const isPlayer = await prisma.user.findFirst({
            where : {
                id : playerID,
            }
        })
        
        if (!isPlayer) {
            return res.status(400).json({ error : "No such player exists" })
        }

        const newScore = await prisma.score.create ({
            data : {
                playerID : playerID,
                gameID : gameID,
                inningNumber : inningNumber,
                ballsPlayed : ballsPlayed,
                totalScore : totalScore,
            }
        })

        return res.status(201).json({
            success : true,
            message : "Socre added",
        })
        
    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Internal server anomaly occurred during save." }); 
    }
})

export default router