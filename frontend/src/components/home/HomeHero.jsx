import MainMenu from "../MainMenu";
import cpu from '/imgs/cpu.svg'
import player from '/imgs/player.svg'
import multiplayer from '/imgs/multiplayer.svg'
import { useState } from "react";

export default function HomeHero() {
    const [currentIndex, setCurrentIndex] = useState(3)

    return (
        <>
            <section className="section__hero">
                <span className="section__hero__text">base ball</span>
                <span className="section__hero__image">
                    <img src="/imgs/konata-hero.png" alt="konata" loading="lazy" />
                </span>
                <span className="section__hero__text-outline">base ball</span>
            </section>
            <MainMenu></MainMenu>
            <section className="section__typography">
                <div className="section__typography__wrapper">
                    <div className="section__typography__nav-wrapper">
                        <div className="section__typography__method" onClick={() => {setCurrentIndex(3)}}> select</div>
                        <div className="section__typography__method" onClick={() => {setCurrentIndex(2)}}> toss</div>
                        <div className="section__typography__method" onClick={() => {setCurrentIndex(1)}}> play</div>
                    </div>
                    <div className="section__typography__information ">
                        {/* PLAY */}
                        <article
                            className={currentIndex < 1 && "article-shift"}
                        >
                            <h2>play</h2>
                            <p>
                                hit the button, <br />jump into the action and claim your victory
                            </p>
                            <div className="article-buttons">
                                <button className="button-previous" onClick={() => {setCurrentIndex(index => index + 1)}}>Previous</button>
                            </div>
                        </article>

                        {/* TOSS */}
                        <article
                            className={currentIndex < 2 && "article-shift"}
                        >
                            <h2>toss</h2>
                            <p>
                                pick red or blue, <br />win the toss, take control, and decide who calls the shots first
                            </p>
                            <div className="article-buttons">
                                <button className="button-previous" onClick={() => {setCurrentIndex(index => index + 1)}}>Previous</button>
                                <button className="button-next" onClick={() => {setCurrentIndex(index => index - 1)}}>Next</button>
                            </div>
                        </article>

                        {/* SELECT */}
                        <article
                            className={currentIndex < 3 && "article-shift"}
                        >
                            <h2>select</h2>
                            <p>pick your match mode:</p> 
                            <p><img src={cpu} alt="Against CPU" />test your skills vs cpu</p>
                            <p><img src={player} alt="Against player" />go head on head in vs player,</p>
                            <p><img src={multiplayer} alt="Team match" />or squad up in team mode</p>
                            <div className="article-buttons">
                                <button className="button-next" onClick={() => {setCurrentIndex(index => index - 1)}}>Next</button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}