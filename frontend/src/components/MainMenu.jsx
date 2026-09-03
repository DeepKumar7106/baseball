import { useAuth } from "../context/AuthContext"

export default function MainMenu() {
    
    // destructuring the useAuth
    const { user, isAuthenticated } = useAuth()
    console.log(user)
    return (
        <>
        <section className="section__main-menu">
            <div className="section__main-menu__menu-wrapper">
                <ul className="section__main-menu__menu-ul">
                    <li className="active-main-menu">hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ul>
            </div>
            <div className="section__main-menu__profile-wrapper">
                {isAuthenticated && <div className="section__main-menu__profile">
                    <div className="section__main-menu__profile__img-wrapper"></div>
                    <p className="section__main-menu__profile__name">{user.username}</p>
                </div>}
                <div className="section__main-menu__hero-wrapper">
                    <img src="../src/assets/konata-hero.png" alt="konata" loading="lazy"/></div>
            </div>
        </section>
        </>
    )
}