export const postScore = async ( {playerID, gameID, inningNumber, ballsPlayed, totalScore} ) => {
    const res = await fetch('http://localhost:5000/api/game/score', {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body : JSON.stringify({ playerID, gameID, inningNumber, ballsPlayed, totalScore })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.error || "Failed to submit game result.");
    }

    // update in future
    return data
}

export const postCpuScore = async ( {gameID, inningNumber, ballsPlayed, totalScore} ) => {
    const playerID = process.env.CPU_PLAYER_ID
    const res = await fetch('http://localhost:5000/api/game/score', {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body : JSON.stringify({ playerID, gameID, inningNumber, ballsPlayed, totalScore })
    })
    
    const data = await res.json()
    
    if (!res.ok) {
        throw new Error(data.error || "Failed to submit game result.");
    }
    
    // update in future
    return data
}