import { useState } from "react";
import Player from "./Player";
import { checkStrike, getOpponentInput, checkWinner } from "../../scripts/game.utils";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Game() {
    // destructuring the useAuth
    const { user, isAuthenticated } = useAuth()
    console.log(user, isAuthenticated) 

    // store player details recieved from /home
    const location = useLocation()

    // default values to prevent crash during loading via URL
    const defaultGameDetails = {
        playerName: user?.username || "Konata",
        opponent: "cpu",
        ballCount: 15,
        inningMode: "batting"
    };

    const gameDetails = location.state || defaultGameDetails

    // if invalid data throw error screen
    if (!gameDetails) return <p>No data found.</p>;
    
    // basic game variables
    const [playerInput, setPlayerInput] = useState(0)
    const [oppnInput, setOppnInput] = useState(0)
    const [strikeCount, setStrikeCount] = useState(0)
    const maxBalls = gameDetails.ballCount
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
    
    // variable for target
    let secondInningBatsmen = 0
    
    // the actaul gameplay
    const handlePlayerClick = (num) => {
        try {
            if (ballCount === 1 || strikeCount === 2) {
                // one inning has came to an end, reset the variables
                console.log("Game end")
                setGameplayMode(false)
                setBallCount(maxBalls + 1)
                setStrikeCount(0)

                // set the target
                setTarget(mode === "batting" ? player.score : opponent.score)

                // update the inningEndString 
                const currentBatter = mode === "balling" ? opponent : player
                const nextBatter = mode === "batting" ? opponent : player
                let inningRemarks = `You have to ${nextBatter.name === player.name ? 'chase' : 'defend'} ${currentBatter.score} in ${maxBalls}`

                if (inningCount && strikeCount === 2) {
                    // for the singleplayer 
                    // for online 1v1 there may have to be different way to evaluate the winner
                    const winner = mode === "batting" ? opponent.name : player.name
                    inningRemarks = `${winner} won the game` 
                }
                setInningEndString(inningRemarks)
            }
            // store player input
            const playerInputValue = num
            
            // get opponent input
            const oppnInputValue = getOpponentInput(opponent.name)          
            
            // future note: when implenting game over network, should add asynchronous opperations on the following
            // update the display values
            if (oppnInputValue) {
                setPlayerInput(playerInputValue)
                setOppnInput(oppnInputValue)
            }
            // update scores
            // check whether a strike or not
            const isStrike = checkStrike(playerInputValue, oppnInputValue)
            if (isStrike) 
                setStrikeCount(count => count + 1)
            else {
                setStrikeCount(0)
                // update the scores
                if (mode == "batting") {
                    setPlayer({
                        ...player,
                        score: player.score + playerInputValue
                    })
                } else {
                    setOpponent({
                        ...opponent,
                        score: opponent.score + oppnInputValue
                    })
                }
                
                // check for win
                // doesnt work as intended
                // issues: strike count reset but in the next iteration , should also reset the both the inputs
                if (inningCount) {
                    const currentScore = mode === "batting" ? player.score : opponent.score
                    const currentInput = mode === "batting" ? playerInputValue : oppnInputValue
                    if (currentScore + currentInput > target) {
                        const winner = mode === "batting" ? player.name : opponent.name
                        const remarks = `${winner} won the game`
                        setInningEndString(remarks)
                        setGameplayMode(false)
                    }
                }

            }
            setBallCount(count => count - 1)

            // check if the target is reached if in the 2nd inning
        } catch (error) {
            console.log(error)
        }
    }

    const handleContinue = () => {
        // allow the player input
        setGameplayMode(true)

        // switch the inning mode 
        setMode(prevMode => prevMode === "batting" ? "balling" : "batting" ) // i am stoopid

        if (!inningCount) 
            setInningCount(1)
    }

    return (
        <>
            {isAuthenticated && <main className="game-main">
                {/* current player stats */}
                <Player player={player}></Player>

                {/* actual game UI */}
                <section className="game-section game-section__input">
                    <h1 className="game-section__input__heading">{mode}</h1>
                    <div className="game-section__input__strike_wrapper">
                        <div className="game-section__input__strike one"></div>
                        <div className="game-section__input__strike two"></div>
                        <div className="game-section__input__strike three"></div>
                    </div>
                    <div className="game-section__input__wrapper">
                        <div className="game-section__input__details">
                            <div className="game-section__input__details__display user">{playerInput}</div>
                            <div className="game-section__input__details__display center">
                                <p>
                                    {gameplayMode ? `Balls Remaining: ${ballCount}` : inningEndString}
                                </p>
                                <p >
                                    {!gameplayMode ? <span
                                                        onClick={handleContinue}
                                                    >
                                                        Continue
                                                    </span> 
                                                    : ""
                                    }
                                </p>
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
            </main>}
        </>
    )
}

// {!gameplayMode && <div className="game-section__input__interval">
//     {/* depending on the mode the player name will change */}
//     <p>{inningEndString}</p>
//     {!inningCount && <button
//         onClick={handleContinue}
//     >Continue</button>}
// </div>}