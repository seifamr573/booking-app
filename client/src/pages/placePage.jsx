import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { differenceInDays } from "date-fns"


let days = 0;


export default function PlacePage() {
    const[redirect,setRedirect]=useState("")
    const [checkIn, setCheckin] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [number, setNumber] = useState(0)
   

if(redirect){
    return (<Navigate to ={redirect} ></Navigate>)
}
    const { id } = useParams()
    if (checkIn && checkOut) {
        days = differenceInDays(new Date(checkOut), new Date(checkIn))
    }
    console.log(id)
    const [place, setPlace] = useState(null)
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/place/' + id).then(response => {
            setPlace(response.data)
        })

    }, [id])
    async function reservation(){
        const data={
    
            checkIn,
            checkOut, number,name
            , phone,place:place._id,
            price: days*place.price 
        }
       const response= await axios.post("/booking",data)
        const bID=response.data.place_id
        setRedirect('/acount/booking/'+bID)
    
    }
    if (place == null)
        return
    return (
        <div className="max-h-l">
            <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8 rounded-3xl">
                <h1 className="text-3xl">{place.title}</h1>
                <a className="block my-2 font-semibold underline" target="_blank" href={"https://maps.google.com/?q=" + place.address}>{place.address}</a>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr]">
                        <div>
                            <div >
                                <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:3000/upload/" + place.addedphotos[0]}></img>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:3000/upload/" + place.addedphotos[1]}></img>


                            <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:3000/upload/" + place.addedphotos[2]}></img>
                        </div>


                    </div>
                </div>

                <div className=" mt-8 gap-8 grid grid-cols-1  md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {place.description}
                        </div>
                        check-in: {place.checkIn}<br></br>
                        check-out: {place.checkOut}<br></br>
                        max number of Guests :{place.max}
                    </div>
                    <div>
                        <div className="bg-white shadow p-4 rounded-2xl">
                            <div className="text-2xl text-center">Price :$ {place.price} / per night</div>
                            <div className="border rounded-2xl mt-4">
                                <div className="flex">
                                    <div className="border-b   py-3  px-4 ">
                                        <label>check in:  </label>
                                        <input value={checkIn} onChange={(ev) => (setCheckin(ev.target.value))} type="date"></input>
                                    </div>
                                    <div className="   py-3  px-4  ">
                                        <label>check out: </label>
                                        <input onChange={(ev) => (setCheckOut(ev.target.value))} value={checkOut} type="date"></input>
                                    </div>

                                </div>
                                <div className=" border-t  py-3  px-4  ">
                                    <label>number of of guests </label>
                                    <input value={number} onChange={(ev) => (setNumber(ev.target.value))} type="number"></input>
                                </div>
                                {days && (
                                    <div className=" border-t  py-3  px-4  ">
                                        <label>Name </label>
                                        <input value={name} placeholder="please type your name" onChange={(ev) => (setName(ev.target.value))} type="text"></input>
                                        <label>phone </label>
                                        <input value={phone} placeholder="please type your phone" onChange={(ev) => (setPhone(ev.target.value))} type="tel"></input>
                                    </div>

                                )}



                            </div>

                            <button onClick={reservation} className="primary mt-4  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                book this place for
                                {days && (
                                    <span>  ${days * place.price}</span>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
