import { useState } from "react";
import Toss from "../utils/Toss";

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
                <section className="section__hero">
                    <span className="section__hero__text base">base</span>
                    <span className="section__hero__cta">
                        <i class="fa-solid fa-circle-play"></i>
                    </span>
                    <span className="section__hero__text ball">ball</span>
                </section>
                <section className="section__typography">
                    <div className="section__typography__select method">select</div>
                    <div className="section__typography__toss method">toss</div>
                    <div className="section__typography__play method">play</div>
                    <div className="section__typography__information "></div>
                </section>
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
                    <Toss gameDetails = {gameDetails} setGameDetails = {setGameDetails}></Toss>
                </section>
                <section className="section__scoreboard">
                    <h2 className="section__scoreboard__heading">Top scores</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>v/s Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>HKthepro</td>
                                <td>99</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>HKthepro</td>
                                <td>99</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>HKthepro</td>
                                <td>99</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>HKthepro</td>
                                <td>99</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>HKthepro</td>
                                <td>99</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    )
}   