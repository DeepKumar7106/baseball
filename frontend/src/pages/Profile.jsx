import PlayerInformation from "../components/profile/PlayerInformation";
import PlayerProfile from "../components/profile/PlayerProfile";

export default function Profile() {
    return (
        <>
            <main className="player-page-main">
                <PlayerProfile />
                <PlayerInformation />
            </main>
        </>
    )
}