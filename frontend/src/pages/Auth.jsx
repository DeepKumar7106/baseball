import { useAuth } from "../context/AuthContext"
import { useProfanityChecker } from "glin-profanity/react"
import { useState } from "react"

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const { result, checkText} = useProfanityChecker({detectLeetspeak: true})
    const [formError, setFromError] = useState("")
    const { login } = useAuth()

    // login function
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target) 
            const formValues = Object.fromEntries(formData.entries())
            const { username, password } = formValues

            if (!username || !password) {
                return
            }

            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            // response from the server
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Registration failed.");
            }
            
            // log the user in 
            login(data.token, data.user)
            
            console.log("Success! Logged");

        } catch (error) {
            console.log(`Error during login: ${error}`)
        }
    }

    // register function
    const handleRegister = async (e) => {
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
    
    const switchToLogin = () => {
        setIsLogin(true)
    }
    const switchToRegister = () => {
        setIsLogin(false)
    }
    return (
        <>
            <main className="form-main">
                <form 
                    onSubmit={isLogin ? handleLogin : handleRegister}
                    method="post" 
                    className="auth-form"
                >
                    <h2 className="auth-form__header">{isLogin ? "Login" : "Register"}</h2>
                    <p className="auth-form__redirect">
                        {isLogin ? "New player?" : "Already have an account?"}    
                        <span onClick={isLogin? switchToRegister : switchToLogin}>

                            {isLogin ? " Create a new account" : " Login"}    
                        </span>
                    </p>
                    <div className="auth-form__nav-wrapper">
                        <span 
                            onClick={!isLogin && switchToLogin} 
                            className={isLogin && "form-span-active"}
                        >login</span>
                        <span 
                            onClick={isLogin && switchToRegister}
                            className={!isLogin && "form-span-active"}
                        >register</span>
                    </div>

                    <input 
                        type="text" 
                        id="registerInputTextUsername" 
                        name="username" 
                        required 
                        placeholder="Username" 
                        maxLength={32}
                        onChange={(e) => {checkText(e.target.value)}}
                    />
                    {(!isLogin && result?.containsProfanity) && <span>Use appropirate usernames</span>}
                    <input 
                        type="password" 
                        id="registerInputTextPassword"  
                        name="password" 
                        required 
                        placeholder="Passowrd" 
                        minLength={8} 
                        maxLength={32}
                    />
                    
                    {/* rendered for login */}
                    {isLogin && <p className="auth-form__redirect">Forget paasword? <a href="">Click here</a></p>}
                    
                    {!isLogin && <input 
                        type="password" 
                        id="registerInputTextConfirmPassword"  
                        name="confirmPassword" 
                        required 
                        placeholder="Confirm Passowrd" 
                        minLength={8} 
                        maxLength={32}
                    />}
                    {passwordMismatch && <span>Passowrd Mismatch</span>}
                    
                    {!isLogin && <input 
                        type="email" 
                        id="registerInputTextEmail" 
                        name="email" 
                        required 
                        placeholder="E-mail"
                    />}
                    
                    {/* rendered for register only */}
                    {!isLogin && <div id="registerCheckboxWrapper">
                        <label htmlFor="registerInputTextTC">Terms and Conditons apply</label>
                        <input type="checkbox" name="terms" required/>
                    </div>}

                    {/* submit button value depends on the isLogin state*/}
                    <input type="submit" value={isLogin ? "Login" : "Register"} />
                </form>
            </main>
        </>
    )
}