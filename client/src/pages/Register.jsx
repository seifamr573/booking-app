import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function registerUser(event) {
        event.preventDefault();
        await axios.post("/register", {
            name,
            email,
            password
        })
        alert("Registretion completed")
    }

    return (

        <div className="mt-4 grow flex items-center justify-around">

            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4 ">Register</h1>
                <form className="max-w-md mx-auto " onSubmit={registerUser}>
                    <input type="text" value={name} onChange={(event => setName(event.target.value))} placeholder="seif elsheemy" />
                    <input type="email" value={email} onChange={(event => setEmail(event.target.value))} placeholder="example@gmail.com" />
                    <input type="password" value={password} onChange={(event => setPassword(event.target.value))} placeholder="password" />
                    <button type="submit" className="primary  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">submit</button>
                    <div className="text-center py-2 text-grey-500">Already a memmber? 
                        <Link to={'/Login'} className="text-blue-500 underline">Login</Link>
                    </div>
                </form>
            </div>

        </div>




    )

}