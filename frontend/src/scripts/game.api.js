const postScore = async ({ playerID, gameID, inningNumber, ballsPlayed, totalScore }) => {
    try {
        const response = await fetch('http://localhost:5000/api/game/score', {
            method: "POST",
            headers: {"Content-Type" : "application/json",},
            body : JSON.stringify({ playerID, gameID, inningNumber, ballsPlayed, totalScore })
        })
        
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.error || "Failed to submit game result.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error for uploading player score." });
    }
}

const postCpuScore = async ({playerID, gameID, inningNumber, ballsPlayed, totalScore}) => {
    try {
        
        const response = await fetch('http://localhost:5000/api/game/score', {
            method: "POST",
            headers: {"Content-Type" : "application/json",},
            body : JSON.stringify({ playerID, gameID, inningNumber, ballsPlayed, totalScore })
        })
        
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.error || "Failed to submit game result.");
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error during cpu upload." });
    }
}

const patchWinner = async ({ winningPlayerID, gameID }) => {
    try {
        const response = await fetch (`http://localhost:5000/api/game/${gameID}/winner`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json",},
            body: JSON.stringify({ winningPlayerID })
        })
        
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error("Failed to uplaod winner");
        }
        
        return data
    } catch (error) {
        return res.status(500).json({ error: "Internal server error during winner upload." });
    }
}

export { postScore, postCpuScore, patchWinner }