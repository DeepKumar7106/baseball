import { useState } from "react";
import Scoreboard from "./Scoreboard";
import HomeHero from "./HomeHero";
import GameTweaker from "../GameTweaker";

export default function Home() { 
    const [gameDetails, setGameDetails] = useState({
        "playerName" : "Konata", // hard coded for the testing puprose
        "opponent" : "cpu", // default will be against the bot
        "gameMode": "singlePlayer", // default mode
        "ballCount": 15, 
        "inningMode": "batting", // default set to batting to prevent any issues
    })
    return (
        <>
            <main className="home-main">
                <HomeHero></HomeHero>
                <GameTweaker gameDetails={gameDetails} setGameDetails={setGameDetails}></GameTweaker>
                <Scoreboard></Scoreboard>
            </main>
        </>
    )
}   