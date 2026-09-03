import MainMenu from "../MainMenu";

export default function HomeHero() {
    return (
        <>
            <section className="section__hero">
                <span className="section__hero__text">base ball</span>
                <span className="section__hero__image">
                    <img src="../src/assets/konata-hero.png" alt="konata" loading="lazy" />
                </span>
                <span className="section__hero__text-outline">base ball</span>
            </section>
            <MainMenu></MainMenu>
            <section className="section__typography">
                <div className="section__typography__wrapper">
                    <div className="section__typography__nav-wrapper">
                        <div className="section__typography__method"> select</div>
                        <div className="section__typography__method"> toss</div>
                        <div className="section__typography__method"> play</div>
                    </div>
                    <div className="section__typography__information ">
                        <article>
                            <h2>play</h2>
                            <p></p>
                        </article>
                        <article>
                            <h2>toss</h2>
                            <p></p>
                        </article>
                        <article>
                            <h2>select</h2>
                            <p></p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}