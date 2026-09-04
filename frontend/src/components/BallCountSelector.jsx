export default function BallCountSelector() {
    return (
        <>
            <div className="ball-count">
                <h2 className="ball-count__header">
                choose how <span className="ball-count__static-text">long</span> the innings should last
                </h2>
                <div className="ball-count__counter-wrapper">
                    <div className="ball-count__counter">
                        <span>4</span>
                        <span>4</span>
                        <span className="ball-count__static-text">balls</span>
                    </div>
                    <div className="ball-count__scroll-area">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span className="center-select-span">4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                    </div>
                </div>
            </div>
        </>
    )
}