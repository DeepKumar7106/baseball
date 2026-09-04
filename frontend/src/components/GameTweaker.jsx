import Toss from "./home/Toss";
import BallCountSelector from "./BallCountSelector";
import { useState } from "react";

export default function GameTweaker() {
    const [isMode, setIsMode] = useState(false)
    const [isToss, setIsToss] = useState(false)
    const [gameDetails, setGameDetails] = useState({
        "playerName" : "Konata", // hard coded for the testing puprose
        "opponent" : "cpu", // default will be against the bot
        "gameMode": "singlePlayer", // default mode
        "ballCount": 15, 
        "inningMode": "batting", // default set to batting to prevent any issues
    })
    
    const handleSinglePlayer = () => {
        // check weather the user is logged in else redirect to login page
        setGameDetails({
            ...gameDetails,
            gameMode : "singlePlayer",
            opponent: "cpu",
        })
        setIsMode(true) // when true there will visual update using isMode && className = active
    }

    const handlePlay = () => {
        // if the mode is selected then allowed or else throw an error
        if (!isMode) {
            // visual update saying to select the mode
            alert("Select mode!")
            return
        }
        setIsToss(true)

    }

    return (
        <>
            <section className="section__game">
                    <div className="section__game__mode-wrapper">
                        <div className="section__game__mode-display">
                            <p className="section__game__mode-display-text">Select the mode you would like to play</p>
                        </div>
                        <div className="section__game__buttons">
                            <div 
                                className="game-mode mode-button single"
                                onClick={handleSinglePlayer}
                            >
                            </div>
                            <div className="game-mode mode-button friend">

                            </div>
                            <div className="game-mode mode-button team">
                            </div>
                        </div>
                    </div>


                    {/* Ball count selector component */}
                    <BallCountSelector></BallCountSelector>
                    <button 
                        className="section__game__play"
                        onClick={handlePlay}    
                    >
                            Play</button>
                    {isToss && <Toss 
                        gameDetails = {gameDetails} setGameDetails = {setGameDetails}
                    ></Toss>}
                </section>
        </>
    )
}