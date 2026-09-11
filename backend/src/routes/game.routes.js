import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

// data uploaded to game table
// game needs winning player id
router.post('/', async (req, res) => { 
    try {
        const newGame = await prisma.game.create({
            data : {}
        })

        return res.status(201).json({
            success : true,
            message : "Game created",
            gameID : newGame.id,
        })        
    } catch (error) {
        return res.status(500).json({ error: "Game could not be created." }); 
    }
})

router.patch('/:id/winner', async (req, res) => {
    const { id } = req.params
    const { winningPlayerId } = req.body

    
    try {
        // all data validated
        // check whether user exist?
        if (winningPlayerId) {
            const isPlayer = await prisma.user.findFirst({
                where : {
                    id : winningPlayerId
                }
            })
            
            if (!isPlayer) {
                return res.status(400).json({ error : "No such player exists" })
            }
        }
        
        // user is valid
        const updatedGame = await prisma.game.create ({
            where : { id },
            data: {
                winningPlayerID : winningPlayerId || null,
            }
        })
        
        return res.status(201).json({
            success : true,
            message : "Game details uploaded",
        })
        
    } catch (error) {
        console.error("Database Transaction Error:", error);
        return res.status(500).json({ error: "Failed to save game winner." }); 
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