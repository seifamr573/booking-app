import { useContext, useState } from "react"
import { UserContext } from "../userContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./place"


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
            <nav className="w-full flex mt-8 gap-4 justify-center mb-8">
                <Link className={selected("profile")} to={"/account"}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    My Profile
                </Link>
                <Link className={selected("bookings")} to={"/account/bookings"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    My Bookings
                </Link>
                <Link className={selected("places")} to={"/account/places"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    My Accommodation
                </Link>

            </nav>
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