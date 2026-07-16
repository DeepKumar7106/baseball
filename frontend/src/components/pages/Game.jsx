import Player from "./Player";

export default function Game() {
    return (
        <>
            <main className="game-main">
                {/* current player stats */}
                <Player></Player>

                {/* actual game UI */}
                <section className="game-section game-section__input">
                    <h1 className="game-section__input__heading">Batting</h1>
                    <div className="game-section__input__wrapper">
                        <div className="game-section__input__wrapper__player">
                            <h2>input</h2>
                            <span>5</span>
                        </div>
                        <div className="game-section__input__strike-wrapper">
                            <div className="strike-one">!!!</div>
                        </div>
                        <div className="game-section__input__wrapper__opponent">
                            <h2>input</h2>
                            <span>5</span>
                        </div>
                    </div>
                    <p className="game-section__input__info-texts">You need 200 from 60 balls</p>
                    <div className="game-section__input__button-wrapper">
                        <button className="game-section__input__button one">1</button>
                        <button className="game-section__input__button two">2</button>
                        <button className="game-section__input__button three">3</button>
                        <button className="game-section__input__button four">4</button>
                        <button className="game-section__input__button five">5</button>
                        <button className="game-section__input__button six">6</button>
                    </div>
                    <div className="game-section__input__ball-count-wrapper">
                        <img src="src/assets/baseball.png" alt="ball" />
                        <h2>Balls remaining: <span id="ballCount">99</span></h2>
                    </div>
                    <p className="game-section__input__optional-info"></p>
                </section>

                {/* opponent player stats */}
                <Player></Player>
            </main>
        </>
    )
}