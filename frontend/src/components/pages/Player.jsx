export default function Player({player}) {
    return (
        <section className="game-section game-section__player">
            <div className="game-section__player__img-wrapper"><img src="src/assets/konata.png" alt="" /></div>
            <div className="game-section__player__stats">
                <p id="playerName">{player.name}</p>
                <h2 className="game-section__player__total" id="playerTotal">{player.score}</h2>
            </div>
        </section>
    )
}