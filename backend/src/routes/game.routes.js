import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

// data uploaded to game table
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
    const { winningPlayerID } = req.body
    
    try {
        // verify the game
        const existingGame = await prisma.game.findUnique({
            where: { id }
        })
        
        if (!existingGame) {
            return res.status(404).json({ error: 'Game not found' });
        }

        const updatedGame = await prisma.game.update ({
            where : { id },
            data: {
                winningPlayerID : winningPlayerID || null,
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