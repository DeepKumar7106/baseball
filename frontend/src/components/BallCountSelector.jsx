import { useEffect, useRef, useState } from "react"

export default function BallCountSelector({handlePlay, gameDetails, setGameDetails}) {
    const [value, setValue] = useState('00')
    const scrollBoxRef = useRef(null)

    useEffect(() => {
        const scrollBox = scrollBoxRef.current
        if (!scrollBox) return
        
        const observerOptions = {
            root: scrollBox,
            rootMargin: '-120px 0px -120px 0px',
            threshold: 0.6,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const val = entry.target.getAttribute('data-value')
                    if (val) {
                        setValue(val);
                        setGameDetails({
                            ...gameDetails,
                            "ballCount": val,
                        })
                    }
                }
            }) 
        }, observerOptions)
        
        const items = scrollBox.querySelectorAll('.ball-count__scroll-area__num-item')
        items.forEach((item) => observer.observe(item))
        
        return () => {
            items.forEach((item) => observer.unobserve(item))
        }       
    }, [])

    // range is from 5 to 99
    const numbers = Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'))

    return (
        <>
            <div className="ball-count">
                <h2 className="ball-count__header">
                choose how <span className="ball-count__static-text">long</span> the innings should last
                </h2>
                <div className="ball-count__counter-wrapper">
                    <div className="ball-count__counter">
                        <span>{value}</span>
                         <span className="ball-count__static-text">balls</span>
                    </div>
                    <div className="ball-count__scroll-area" ref={scrollBoxRef}>
                        <div className="ball-count__scroll-area__padding" />

                        {numbers.map((num) => {
                            const isActive = num === value
                            return (
                                <div 
                                key={num}
                                data-value={num}
                                    className={`ball-count__scroll-area__num-item ${isActive? "ball-count__scroll-area__num-active" : ""}`} >
                                        {num}
                                </div>
                            )
                        })}

                        <div className="ball-count__scroll-area__padding" />
                    </div>
                </div>
                <button 
                    className="section__game__play"
                    onClick={handlePlay}    
                >
                    Play</button>
            </div>
        </>
    )
}