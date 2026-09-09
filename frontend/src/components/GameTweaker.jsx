import Toss from "./home/Toss";
import BallCountSelector from "./BallCountSelector";
import { useState } from "react";
import cpu from '/imgs/cpu.svg'
import player from '/imgs/player.svg'
import multiplayer from '/imgs/multiplayer.svg'

export default function GameTweaker({ gameDetails, setGameDetails }) {
    const [isMode, setIsMode] = useState(false)
    const [isToss, setIsToss] = useState(false)
   
    
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
                                <img src={cpu} alt="against cpu" />
                            </div>
                            <div className="game-mode mode-button friend">
                                <img src={player} alt="against player" />
                            </div>
                            <div className="game-mode mode-button team">
                                <img src={multiplayer} alt="Team mode" />
                            </div>
                        </div>
                    </div>
                </section>


                    {/* Ball count selector component */}
                    <BallCountSelector handlePlay={handlePlay} gameDetails={gameDetails} setGameDetails={setGameDetails}></BallCountSelector>
                    
                    <Toss 
                        gameDetails = {gameDetails} setGameDetails = {setGameDetails} isToss = {isToss}
                    ></Toss>
        </>
    )
}