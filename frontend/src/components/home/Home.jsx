import { useState } from "react";
import Scoreboard from "./Scoreboard";
import HomeHero from "./HomeHero";
import GameTweaker from "../GameTweaker";

export default function Home() {
    return (
        <>
            <main className="home-main">
                <HomeHero></HomeHero>
                <GameTweaker></GameTweaker>
                <Scoreboard></Scoreboard>
            </main>
        </>
    )
}   