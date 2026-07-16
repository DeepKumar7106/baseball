export default function Player() {
    return (
        <section className="game-section game-section__player">
            <div className="game-section__player__img-wrapper"><img src="src/assets/konata.png" alt="" /></div>
            <div className="game-section__player__stats">
                <p id="playerName">Konata</p>
                <h2 className="game-section__player__total" id="playerTotal">75</h2>
            </div>
        </section>
    )
}