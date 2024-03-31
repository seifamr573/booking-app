import { Link, Navigate } from "react-router-dom";
import { useState,useContext } from "react";
import axios from "axios"
import { UserContext } from "../userContext";


export default function LoginPage() {
   
    const{setUser}=useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[redirect,setRedirect]=useState(false)
    async function Login(event){
        event.preventDefault();
        try {
           const userI= await axios.post("/Login",{
                email,
                password
            })
            setUser(userI.data);
            setRedirect(true);
           // alert("sucess")
            
        } catch (error) {
            alert("login failed")
        }
        

    }
    if(redirect){
        return(
            <Navigate to={'/'}/>
        )
    }
    return (

        <div className="mt-4 grow flex items-center justify-around">

            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4 ">login</h1>
                <form className="max-w-md mx-auto " onSubmit={Login}>
                    <input type="email" value={email} onChange={(event => setEmail(event.target.value))} placeholder="example@gmail.com" />
                    <input type="password" value={password} onChange={(event => setPassword(event.target.value))} placeholder="password" />
                    <button type="submit" className="primary  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">submit</button>
                    <div className="text-center py-2 text-grey-500">Don't have an acount ?
                        <Link to={'/Register'} className="text-blue-500 underline"> Register now?</Link>
                    </div>
                </form>
            </div>

        </div>
    )



}