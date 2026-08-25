import { useProfanityChecker } from "glin-profanity/react";
import { useState } from "react"

export default function Register () {

    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [formError, setFromError] = useState("")
    const { result, checkText} = useProfanityChecker({detectLeetspeak: true})

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const formData = new FormData(e.target); 
            const formValues = Object.fromEntries(formData.entries()); 
            const {username, password, confirmPassword, email} = formValues
            
            // validating both pw are same
            const isMismatch = password !== confirmPassword
            setPasswordMismatch(isMismatch)

            if (result?.containsProfanity && isMismatch) return

            // if the username is valid and pw are confirmed, send data to backend

            // define the packet (address and msg)
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ username, password, email }),
            })

            // response from the server
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Registration failed.");
            }
    
            console.log("Success! Account created:", data);

        } catch (error) {
            console.error("An error occurred during processing:", error);
        }
    }

    return (
        <main id="registerMain" className="form-main">
            <form onSubmit={handleSubmit} id="registerForm" method="post"> 
                <h1 id="registerFormHeading">Register</h1>
                <p>Already have an account? <a href="/login">Login</a></p>
                <input 
                    type="text" 
                    id="registerInputTextUsername" 
                    name="username" 
                    required 
                    placeholder="Username" 
                    maxLength={32}
                    onChange={(e) => {checkText(e.target.value)}}
                />
                {result?.containsProfanity && <span>Use appropirate usernames</span>}
                <input 
                    type="password" 
                    id="registerInputTextPassword"  
                    name="password" 
                    required 
                    placeholder="Passowrd" 
                    minLength={8} 
                    maxLength={32}
                    />
                <input 
                    type="password" 
                    id="registerInputTextConfirmPassword"  
                    name="confirmPassword" 
                    required 
                    placeholder="Confirm Passowrd" 
                    minLength={8} 
                    maxLength={32}
                />
                {passwordMismatch && <span>Passowrd Mismatch</span>}
                
                <input 
                    type="email" 
                    id="registerInputTextEmail" 
                    name="email" 
                    required 
                    placeholder="E-mail"
                />
                <div id="registerCheckboxWrapper">
                    <label htmlFor="registerInputTextTC">Terms and Conditons apple</label>
                    <input type="checkbox" name="terms" id="registerInputTextTC" required/>
                </div>
                <input type="submit" value="Register" />
            </form>
        </main>
    );
}