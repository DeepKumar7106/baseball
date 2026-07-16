export default function Login () {
    return (
        <main id="loginMain" className="form-main">
            <form action="" id="loginForm">
                <h1 id="loginFormHeading">Login</h1>
                <input type="text" id="loginInputTextUsername" name="username" required placeholder="Username" max={32}/>
                <input type="password" id="loginInputTextPassword" name="pass" required placeholder="Passowrd" min={8} max={32}/>
                <label htmlFor=""><a href="">Forgot Password?</a></label>
                <input type="submit" value="Login" />
            </form>
        </main>
    )
}