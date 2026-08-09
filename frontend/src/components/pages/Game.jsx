import { useState } from "react";
import Player from "./Player";
import { checkStrike, getOpponentInput } from "../../scripts/game.utils";
import { useLocation, useParams } from "react-router-dom";

export default function Game() {
    // store player details recieved from /home
    const location = useLocation()
    const gameDetails = location.state

    // if invalid data throw error screen
    if (!gameDetails) return <p>No data found.</p>;
    
    // basic game variables
    const [userInput, setUserInput] = useState(0)
    const [oppnInput, setOppnInput] = useState(0)
    const [strikeCount, setStrikeCount] = useState(0)
    const maxBalls = gameDetails.ballCount
    const [ballCount, setBallCount] = useState(maxBalls) 
    
    // name is hardcoded for testing, future note to update them over params
    const [user, setUser] = useState({
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

    // the actaul gameplay
    const handleUserClick = (num) => {
        try {
            if (ballCount === 1 || strikeCount === 2) {
                // one inning has came to an end, reset the variables
                console.log("Game end")
                setGameplayMode(false)
                setBallCount(maxBalls)
                setStrikeCount(0)

            }
            // store user input
            const userInputValue = num
            
            // get opponent input
            const oppnInputValue = getOpponentInput(opponent.name)          
            
            // future note: when implenting game over network, should add asynchronous opperations on the following
            // update the display values
            if (oppnInputValue) {
                setUserInput(userInputValue)
                setOppnInput(oppnInputValue)
            }
            
            // update scores
            // check whether a strike or not
            const isStrike = checkStrike(userInputValue, oppnInputValue)
            if (isStrike) 
                setStrikeCount(count => count + 1)
            else {
                setStrikeCount(0)
                if (mode == "batting") {
                    setUser((prevUser) => ({
                        ...prevUser,
                        score: prevUser.score + userInputValue
                    }))
                } else {
                    setOpponent((prevOpponent) => ({
                        ...prevOpponent,
                        score: prevOpponent.score + oppnInputValue
                    }))
                }
            }
            setBallCount(count => count - 1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <main className="game-main">
                {/* current player stats */}
                <Player player={user}></Player>

                {/* actual game UI */}
                <section className="game-section game-section__input">
                    <h1 className="game-section__input__heading">{mode}</h1>
                    <div className="game-section__input__wrapper">
                        <div className="game-section__input__wrapper__player">
                            <h2>input</h2>
                            <span>{userInput}</span>
                        </div>
                        <div className="game-section__input__strike-wrapper">
                            <div className="strike-one">{"!".repeat(strikeCount)}</div>
                        </div>
                        <div className="game-section__input__wrapper__opponent">
                            <h2>input</h2>
                            <span>{oppnInput}</span>
                        </div>
                    </div>
                    <p className="game-section__input__info-texts">You need 200 from 60 balls</p>
                    <div className="game-section__input__button-wrapper">

                        {gameplayMode && [1,2,3,4,5,6].map((num) => (
                            <button 
                                key={num}
                                className={`game-section__input__button`}
                                onClick={() => handleUserClick(num)}

                            >{num}</button>
                        ))}

                        {!gameplayMode && <div className="game-section__input__interval">
                            {/* depending on the mode the player name will change */}
                            <p>The target for the player {user.name} is {user.score}</p>
                            <button>Continue</button>
                        </div>}

                        
                    </div>
                    <div className="game-section__input__ball-count-wrapper">
                        <img src="src/assets/baseball.png" alt="ball" />
                        <h2>Balls remaining: <span id="ballCount">{ballCount}</span></h2>
                    </div>
                    <p className="game-section__input__optional-info"></p>
                </section>

                {/* opponent player stats */}
                <Player player={opponent}></Player>
            </main>
        </>
    )
}