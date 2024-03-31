import { Link } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get("/places").then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data])
        })
    })
    return (

        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-4 lg::grid-cols-4">
            {places.length > 0 && places.map(place =>(
                <Link to={"/place/" + place._id}>
                    <div className="flex mb-2">
                        <img className="rounded-2xl aspect-rectangle max-w-xs object-cover  " src={"http://localhost:3000/upload/" + place.addedphotos[0]} />
                    </div>

                    <h2 className="text-sm truncate leading-4">{place.address}</h2>
                    <h3 className="text-gray-500 font-bold">{place.title}</h3>
                    <div className="mt-2">
                        <span className="font-bold">{place.price} $</span> per night
                    </div>
                </Link>
            ))}

        </div>



    )
}