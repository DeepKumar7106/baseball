import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validatePlayerTag } from "../controllers/playerTag.js";

const router = Router()

router.get('/search', async (req, res) => {
    const { playerDetail } = req.body
    try {
        const firstCharacterOfPlayerDetail = playerDetail.toString().split('')[0]
        if (firstCharacterOfPlayerDetail === "#") {
            const playerTag = playerDetail.toString().slice(1)

            const isValid = validatePlayerTag(playerTag)

            if (!isValid) {
                return res.status(404).json({ error: "No player found and tag is invalid!"})
            }
            
            const user = await prisma.user.findUnique({
                where: {
                    playerTag : playerTag
                }
            })
            
            if (!user) {
                return res.status(404).json({ error: "No player found!"})
            }

            return res.status(200).json({
                success: true,
                message: 'Player found',
                user : user,
            })
        }
        
        const users = await prisma.user.findFirst({
            where: {
                username: playerDetail
            }
        })
        
        if (!users) {
            return res.status(404).json({ error: "No player found!"})
        }

        return res.status(200).json({
            success: true,
            message: 'Players found',
            users : users,
        })
        
    } catch (error) {
        console.error("Player query error: ", error)
        return res.status(500).json({ error: "Internal server anomaly occurred during fetching player." });
    }


})

export default router