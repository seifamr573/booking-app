import { useContext, useState } from "react"
import { UserContext } from "../userContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./place"
import AccountNav from "./acountNav"


export default function AcountPage() {
    const { user, ready, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { sub } = useParams()
    if (sub === undefined) {
        sub = "profile"
    }



    if (!ready) {
        return "loading .....!"
    }

    if (!user && ready && !redirect) {
        return <Navigate to={"/login"}></Navigate>
    }

    async function logout() {
        await axios.post("/logout")
        setUser(null)
        setRedirect('/')
    }
    if (redirect) {
        return (
            <Navigate to={redirect}></Navigate>)
    }
  
    function selected(t = null) {
        let classes = "inline-flex gap-1 py-2 px-6 rounded-full"

        if (t === sub) {

            return classes+=" bg-pr"
        }
        else{
            return classes+="bg-gray-200"

        }
      return classes
    }


    return (
        <div>
           <AccountNav></AccountNav>
            {sub === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} {user.email} <br />
                    <button onClick={logout} className="bg-pr max-w-lg mt-2 rounded-full ">Log out</button>
                </div>
            )}
            {sub === "places" && (
                <PlacesPage></PlacesPage>
            )}
        </div>
    )
}