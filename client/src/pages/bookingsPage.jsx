import AccountNav from "./acountNav";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function BookingsPage(){
    const [bookings,setBookings]=useState([]);
    
    const{id}=useParams
    useEffect(()=>{
        axios.get('/bookings').then(response=>{

            //console.log(response.data)
            setBookings(response.data)
            console.log(bookings)
            
        })
       




    },[])
    return(<div>
    <AccountNav></AccountNav>
    <div>{
          
            bookings.map(booking=>(
                <div>
                    {booking.checkIn}   {booking.checkOut}
                </div>
            ))
           
        }
    </div>
       
    </div>)
}