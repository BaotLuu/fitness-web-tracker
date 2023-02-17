import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const {signup,isLoading,error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(userName,password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label >Email:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />

            <label >Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup