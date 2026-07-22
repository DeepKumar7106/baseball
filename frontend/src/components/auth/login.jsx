export default function Login () {
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target) 
            const formValues = Object.fromEntries(formData.entries())
            const { username, password } = formValues
            
            console.log(username, password)

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
    
            console.log("Success! Logged");

        } catch (error) {
            console.log(`Error during login: ${error}`)
        }
    }

    return (
        <main id="loginMain" className="form-main">
            <form onSubmit={formSubmit} id="loginForm" method="post">
                <h1 id="loginFormHeading">Login</h1>
                <input 
                    type="text" 
                    id="loginInputTextUsername" 
                    name="username" 
                    required 
                    placeholder="Username" 
                    maxLength={32}
                />
                <input 
                    type="password" 
                    id="loginInputTextPassword" 
                    name="password" 
                    required 
                    placeholder="Passowrd" 
                    minLength={8} 
                    maxLength={32}
                />
                <label htmlFor="">
                    <a href="">Forgot Password?</a>
                </label>
                <input 
                    type="submit" 
                    value="Login" 
                />
            </form>
        </main>
    )
}