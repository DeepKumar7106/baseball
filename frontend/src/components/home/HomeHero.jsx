export default function HomeHero() {
    return (
        <>
            <section className="section__hero">
                <span className="section__hero__text base">base</span>
                <span className="section__hero__cta">
                    <i class="fa-solid fa-circle-play"></i>
                </span>
                <span className="section__hero__text ball">ball</span>
            </section>
            <section className="section__typography">
                <div className="section__typography__select method">select</div>
                <div className="section__typography__toss method">toss</div>
                <div className="section__typography__play method">play</div>
                <div className="section__typography__information "></div>
            </section>
        </>
    )
}