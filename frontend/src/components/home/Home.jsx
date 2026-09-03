import { useState } from "react";
import Toss from "./Toss";
import Scoreboard from "./Scoreboard";
import HomeHero from "./HomeHero";
import MainMenu from "../MainMenu";

export default function Home() {
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
            <main className="home-main">
                <HomeHero></HomeHero>
                <section className="section__game">
                    <div className="section__game__mode-wrapper">
                        <div className="section__game__buttons">
                            <div 
                                className="game-mode single"
                                onClick={handleSinglePlayer}
                            >
                                <div className="mode-button"></div>
                                <p className="mode-label label-single">Single</p>
                            </div>
                            <div className="game-mode friend">
                                <div className="mode-button"></div>
                                <p className="mode-label label-friend">Friend</p>

                            </div>
                            <div className="game-mode team">
                                <div className="mode-button"></div>
                                <p className="mode-label label-team">Team</p>
                            </div>
                        </div>
                    </div>
                    <div className="section__game__ball-wrapper">
                        <input type="range" name="" id="" className="custom-range-input"/>
                        <div className="section__game__ball-slider"></div>
                    </div>
                    <button 
                        className="section__game__play"
                        onClick={handlePlay}    
                    >
                            Play</button>
                    {isToss && <Toss gameDetails = {gameDetails} setGameDetails = {setGameDetails}></Toss>}
                </section>
                <Scoreboard></Scoreboard>
            </main>
        </>
    )
}   