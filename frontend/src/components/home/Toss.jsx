import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Toss({gameDetails, setGameDetails, isToss}) {

    const [tossMode, setTossMode] = useState("color") // defines whether choosing to bat/ball or head/tai
    const [tossDisplayText, setTossDisplayText] = useState("") // stores text
    const [buttonChosen, setButtonChosen] = useState(false) // defines the visibility of the text '_'
    const [playerTossResult, setPlayerTossResult] = useState(true) // defines the visibility of the text '_'
    const navigate = useNavigate()
    
    const handleClick = (choice) => {
        setButtonChosen(true)
        const choiceList = ["red", "blue"]
        if (tossMode === "color") {
            // update the tossMode
            setTossMode("inningMode")

            // get a random value either 0 or 1 
            const toss = Math.round(Math.random())

            // compare with the user click
            if (choice !== choiceList[toss]) {
                // user lost the toss 
                setPlayerTossResult(false)
                
                // let the computer select the inning mode 
                const computerChoice = computerSelect()
                setGameDetails({
                    ...gameDetails,
                    inningMode: computerChoice === "ball" ? "batting" : "balling"
                })

                setTossDisplayText(`you have lost the toss.:(\n opponent chose ${computerChoice}`)
                return
            }
            
            // update the UI accordingly
            setTossDisplayText(`you have won the toss\nRed : Bat\nBlue : Ball`)
        } else {
            // if choice is red then bat or else ball
            // update the data packet to set the choice
            const playerChoice = choice === "red" ? "batting" : "balling"
            const updatedGameDetails = {
                ...gameDetails,
                inningMode: playerChoice,
            }

            setGameDetails(updatedGameDetails)
            
            navigatePlay(updatedGameDetails)
        }
    }

    const navigatePlay = (details = gameDetails) => {
        navigate(`/game`, { state: details })
    }

    return (
        <>
            <section className="toss_section">
                <div className={`toss_section__doors left ${isToss ? 'animate-left' : ''}`} ></div>
                <div className={`toss_section__doors right ${isToss ? 'animate-right' : ''}`}></div>
                <div className="toss_section__buttons-wrapper">
                    <div className="toss_section__display">
                        <p>Choose one button{!buttonChosen && <span>_</span>}</p>
                        <p>{tossDisplayText}{buttonChosen && <span>_</span>}</p>
                        {!playerTossResult && <p onClick={() => {navigatePlay(gameDetails)}}>Play</p>}
                    </div>
                    <div className="toss_section__buttons-wrapper__buttons">
                        <button onClick={() => {handleClick("red")}}></button>
                        <button onClick={() => {handleClick("blue")}}></button>
                    </div>
                </div>
            </section>
        </>
    )
}

const computerSelect = () => {
    const choice = Math.round(Math.random())
    return choice ? "bat" : "ball"
}
