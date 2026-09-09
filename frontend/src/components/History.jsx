export default function History() {
    return (
        <>
        <main className="history-main">
            <section className="history-player-stats">
                <div className="history-player-stats__image">
                    <img src="src/assets/konata.png" alt="" />
                </div>
                <div className="history-player-stats__wrapper">
                    <h2 id="historyPlayerName">Konata</h2>
                    <p id="historyPlayerPB">75</p>
                    <p id="historyPlayerGame">5</p>
                    <p id="historyPlayerOpponent">v/s HKthepro</p>
                </div>
            </section>
            <table className="history-table">
                <thead>
                    <tr>
                        <th className="right-align">Game No.</th>
                        <th className="history-oppn-name">v/s</th>
                        <th>Ball</th>
                        <th>your score</th>
                        <th>opponent score</th>
                        <th>result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="right-align">001</td>
                        <td>HKthepro</td>
                        <td>15</td>
                        <td>99</td>
                        <td>99</td>
                        <td>win</td>
                    </tr>
                    <tr>
                        <td className="right-align">001</td>
                        <td>HKthepro</td>
                        <td>15</td>
                        <td>99</td>
                        <td>99</td>
                        <td>win</td>
                    </tr>
                    <tr>
                        <td className="right-align">001</td>
                        <td>HKthepro</td>
                        <td>15</td>
                        <td>99</td>
                        <td>99</td>
                        <td>win</td>
                    </tr>
                    <tr>
                        <td className="right-align">001</td>
                        <td>HKthepro</td>
                        <td>15</td>
                        <td>99</td>
                        <td>99</td>
                        <td>win</td>
                    </tr>
                </tbody>
            </table>
        </main>
        </>
    )
}