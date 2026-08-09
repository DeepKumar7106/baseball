import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Toss({gameDetails, setGameDetails}) {

    const [tossMode, setTossMode] = useState("color")
    const [buttonsVisible, setButtonVisible] = useState(true)
    const [computerChoice, setComputerChoice] = useState("")
    const navigate = useNavigate()

    const handleClick = (choice) => {
        const choiceList = ["red", "blue"]
        if (tossMode === "color") {
            // update the tossMode
            setTossMode("inningMode")

            // get a random value either 0 or 1 
            const toss = Math.round(Math.random())

            // compare with the user click
            if (choice !== choiceList[toss]) {
                // user lost the toss 
                setButtonVisible(false)
                
                // let the computer select the inning mode 
                const computerChoice = computerSelect()
                setComputerChoice(computerChoice)
                console.log(gameDetails)
                setGameDetails({
                    ...gameDetails,
                    inningMode: computerChoice === "ball" ? "batting" : "balling"
                })
                console.log(gameDetails)
                return
            }

            // update the UI accordingly
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
                <div className="toss_section__display">
                    <h1>Toss</h1>
                    <p>Won blah blah</p>
                </div>
                {buttonsVisible && <div className="toss_section__wrapper">
                    <div className="toss_section__buttons">
                        <div 
                            className="toss_section__button_box"
                            onClick={() => handleClick("red")}
                        >
                            <button className="red">Red</button>
                            {tossMode === "inningMode" && <span>Bat</span>}
                        </div>
                        <div 
                            className="toss_section__button_box"
                            onClick={() => handleClick("blue")}
                        >
                            <button className="blue">Blue</button>
                            {tossMode === "inningMode" && <span>Ball</span>}
                        </div>
                    </div>
                    <p>Choose one {tossMode}</p>
                </div> }

                {/* player lost the toss */} 
                { computerChoice && <div className="toss_section__opponent_choice">
                    <p>The opponent decided to {computerChoice} first! </p>
                    <button 
                        onClick={() => {navigatePlay(gameDetails)}}
                    >Play</button>
                </div> }
            </section>
        </>
    )
}

const computerSelect = () => {
    const choice = Math.round(Math.random())
    return choice ? "bat" : "ball"
}