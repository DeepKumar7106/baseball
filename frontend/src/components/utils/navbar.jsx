export default function Navbar() {
    return (
        <>
            <nav>
                <div className="nav-logo">
                    <img src="src\assets\logo-black.svg" alt="logo" className="nav-img" />
                </div>
                <ul className="nav-ul">
                    <li className="nav-li home active"><a href="">Home</a></li>
                    <li className="nav-li rules"><a href="">Rules</a></li>
                    <li className="nav-li history"><a href="">History</a></li>
                    <li className="nav-li play"><a href="">Play</a></li>
                </ul>
            </nav>
        </>
    )
}