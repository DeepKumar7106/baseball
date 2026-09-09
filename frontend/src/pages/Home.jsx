import { useState } from "react";
import Scoreboard from "../components/home/Scoreboard";
import HomeHero from "../components/home/HomeHero";
import GameTweaker from "../components/GameTweaker";
import { useAuth } from "../context/AuthContext";

export default function Home() { 
    const { user, isAuthenticated } = useAuth()

    const [gameDetails, setGameDetails] = useState({
        "playerName" :  isAuthenticated ? user.username : "Konata", // hard coded for the testing puprose
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