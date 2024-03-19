import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext.js"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigation = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigation('/login')
    }

    const { user } = useContext(AuthContext)
    console.log(user)

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Raja BOOKING</span>
                </Link>
                {user ? user.userName : <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton" onClick={handleLogin}>Log In</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar