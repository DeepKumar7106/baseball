import { useEffect, useState } from "react"
import Player from "../components/Player"
import { checkStrike, getOpponentInput, checkWinner } from "../scripts/game.utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { postScore } from "../scripts/game.api"

// const handlePostScore = async (scoreDetails) {
//     try {
//         const result = await postScore(scoreDetails)
//     } catch (error) {
//         console.error("Error:", err.message)
//     }
// }

export default function Game() {
    // destructuring the useAuth
    const { user, isAuthenticated } = useAuth()
    // store player details recieved from /home
    const location = useLocation()
    // redirecting hook
    const navigate = useNavigate()

    // default values to prevent crash during loading via URL
    // no data from the home :(
    const defaultGameDetails = {
        playerName: user?.username || "Konata",
        opponent: "cpu",
        ballCount: 15,
        inningMode: "batting",
        isOnline: false,
        gameId: null
    };

    // fetches the game information from the home
    const gameDetails = location.state || defaultGameDetails
    const maxBalls = gameDetails.ballCount


    // if invalid data throw error screen
    if (!gameDetails) return <p>No data found.</p>;
    
    // basic game states
    const [playerInput, setPlayerInput] = useState(0)
    const [oppnInput, setOppnInput] = useState(0)
    const [strikeCount, setStrikeCount] = useState(0)
    const [ballCount, setBallCount] = useState(maxBalls) 
    // name is hardcoded for testing, future note to update them over params
    const [player, setPlayer] = useState({
        "name": gameDetails.playerName,
        "score": 0,
    })
    // same for the opponent names
    const [opponent, setOpponent] = useState({
        "name":gameDetails.opponent,
        "score":0
    })
    // gameplay variables
    const [gameplayMode, setGameplayMode] = useState(true) // defines whether the input is allowed 
    const [mode, setMode] = useState(gameDetails.inningMode) // batting or balling
    const [inningCount, setInningCount] = useState(0) // defines the UI for each inning
    const [target, setTarget] = useState(0) // defines the UI for each inning
    const [inningEndString, setInningEndString] = useState("") // defines the UI for each inning
    const [ctaButton, setCtaButton] = useState("Continue") // defines the button on the display
    
    const processTurn = (playerInput, opponentInput) => {
        // set both players input
        setPlayerInput(playerInput)
        setOppnInput(opponentInput)

        // check for strike
        const isStrike = checkStrike(playerInput, opponentInput)
        
        if (isStrike) {
            setStrikeCount(count => count + 1)
        } else {
            setStrikeCount(0)

            if (mode == "batting") {
                setPlayer((prev) => {
                    const newScore = prev.score + playerInput
                    checkTargetReached(newScore, opponent.score)
                    return {
                        ...prev,
                        score: newScore
                    }
                })
            } else {
                setOpponent((prev) => {
                    const newScore = prev.score + opponentInput
                    checkTargetReached(player.score, newScore)
                    return {
                        ...prev,
                        score: newScore
                    }
                })   
            }
        }

        setBallCount((count) => count - 1)
    }

    const checkTargetReached = (playerScore, opponentScore) => {
        if (inningCount === 1) {
            const currentBatterScore = mode === "batting" ? playerScore : opponentScore
            console.log(currentBatterScore)
            if (currentBatterScore >= target) {
                const winner = mode === "batting" ? player.name : opponent.name
                setInningEndString(`${winner} won the game`)
                setGameplayMode(false)
            }
        }
    }
    // the actaul gameplay
    const handlePlayerClick = (num) => {
        try {
            if (!gameplayMode) return

            if (ballCount === 1 || strikeCount === 2) {
                handleInningEnd()
                return
            }

            if (!gameDetails.isOnline) {
                const cpuMove = Math.floor(Math.random() * 6) + 1
                processTurn(num, cpuMove)
            } else {
                // online mode
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!gameDetails.isOnline) return
    }, [gameDetails.isOnline])

    const handleInningEnd = () => {
        if (inningCount === 1) {
            const winner = (player.score > opponent.score) ? player : opponent
            setInningEndString(`${winner.name} won the game`)
            setGameplayMode(false)
        } else {
            setGameplayMode(false)
            const currentPlayerScore = (mode === "batting" ? player.score : opponent.score)
            const target = Number(currentPlayerScore) + 1
            setTarget(target)
            
            const currentBatter = mode === "balling" ? opponent : player
            const nextBatter = mode === "batting" ? opponent : player
            let inningRemarks = `You have to ${nextBatter.name === player.name ? 'chase' : 'defend'} ${currentBatter.score} in ${maxBalls}`
            
            setInningEndString(inningRemarks)
        }
    }

    const handleContinue = () => {
        if (ctaButton === "home") {
            // post to score
            const curretBallCount = Number(maxBalls) - Number(ballCount)
            const scoreRequirements = {
                "playerID" : user.id,     
                "gameID" : gameDetails.gameId,           
                "inningNumber" : 2,
                "ballsPlayed" : curretBallCount,
                "totalScore" : player.score
            }

            handlePostScore(scoreRequirements)
            
            // redirect to home page
            navigate('/')
            return
        }

        // reset the innign variables and allow the player input
        setBallCount(maxBalls)
        setGameplayMode(true)
        setStrikeCount(0)
        setCtaButton("home")
        setMode(prevMode => prevMode === "batting" ? "balling" : "batting" ) // i am stoopid
        if (!inningCount) setInningCount(1)
    }

    const handlePostScore = async (scoreDetails) => {
        try {
            const result = await postScore(scoreDetails)

            const data = await result.json()

            if (!result.ok) {
                throw new Error(data.error || "Score upload failed");
            }
        } catch (error) {
            console.error("Error:", err.message)
        }
    }

    if (!isAuthenticated) {
        navigate('\login')
        return
    }

    return (
        <>
            <main className="game-main">
                {/* current player stats */}
                <Player player={player}></Player>

                {/* actual game UI */}
                <section className="game-section game-section__input">
                    <h1 className="game-section__input__heading">{mode}</h1>
                    <div className="game-section__input__strike_wrapper">
                        <div 
                            className={`game-section__input__strike_bulb ${strikeCount > 0 ? 'strike' : ''}`}
                        ></div>
                        <div 
                            className={`game-section__input__strike_bulb ${strikeCount > 1 ? 'strike' : ''}`}
                        ></div>
                        <div 
                            className={`game-section__input__strike_bulb ${strikeCount > 2 ? 'strike' : ''}`}
                        ></div>
                    </div>
                    <div className="game-section__input__wrapper">
                        <div className="game-section__input__details">
                            <div className="game-section__input__details__display user">{playerInput}</div>
                            <div className="game-section__input__details__display center">
                                <p>
                                    {gameplayMode ? `Balls Remaining: ${ballCount}` : inningEndString}
                                </p>
                                {!gameplayMode && <button onClick={handleContinue}>
                                    {ctaButton}
                                </button>}
                            </div>
                            <div className="game-section__input__details__display player">{oppnInput}</div>
                        </div>
                        <div 
                            className={`game-section__input__button_wrapper ${gameplayMode ? '' : 'disable_user_input'}`}
                        >
                            {[1,2,3,4,5,6].map((num) => (
                                <button 
                                    key={num}
                                    className={`game-section__input__button`}
                                    onClick={() => handlePlayerClick(num)}

                                >{num}</button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* opponent player stats */}
                <Player player={opponent}></Player>
            </main>
        </>
    )
}
