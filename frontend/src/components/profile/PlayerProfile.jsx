export default function PlayerProfile() {
    return (
        <>
            <section className="player-profile-section">
                <div className="player-profile-section__nav">
                    <button>
                        home
                    </button>
                </div>
                <div className="player-profile-section__profile">
                    <div className="player-profile-section__profile-img-box"></div>
                    <div className="player-profile-section__player-details">
                        <div className="player-profile-section__player-details__text">
                            <h2>Konata Izumi</h2>
                            <h3>#7106DEEP</h3>
                        </div>
                        <div className="player-profile-section__player-details__button-wrapper">
                            <button className="player-profile-section__player-details__button button-1">add friend</button>
                            <button className="player-profile-section__player-details__button button-2">match</button>
                        </div>
                    </div>
                    <div className="player-profile-section__player-stats">
                        {/* could use a map */}
                        <table>
                            <tr>
                                <td>Game</td>
                                <td>999</td>
                            </tr>
                            <tr>
                                <td>won</td>
                                <td>##</td>
                            </tr>
                            <tr>
                                <td>Highscore</td>
                                <td>999</td>
                            </tr>
                            <tr>
                                <td>last game</td>
                                <td>won</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}