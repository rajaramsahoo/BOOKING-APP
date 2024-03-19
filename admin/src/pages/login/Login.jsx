import "./login.scss"
import { useContext, useState } from "react"
 import { AuthContext } from "../../context/authContext.js"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

   const { loadind, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined
  })

  function handleChange(e) {
    console.log(e.target.value)
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
        navigate('/')
      }
     else{
      dispatch({ type: "LOGIN_FAILURE", payload: {msg:"You not Allowed bcz ur not admin"}})
     }
    }
    catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
  }

  console.log(error)

  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" className="lInput"
          placeholder="userName" id="userName"
          onChange={handleChange} />
        <input type="password" className="lInput"
          placeholder="password" id="password"
          onChange={handleChange} />
        <button className="lButton" onClick={handleClick}>Login</button>

        {error && <span>{error.error}</span>}
      </div>
    </div>
  )
}

export default Login