import { useEffect, useState } from "react";
import { Link, Navigate, parsePath, useParams } from "react-router-dom"
import axios from "axios";
var i;
var editOrNew=false;
export default function PlacesPage() {
    const {id}=useParams();
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedphotos, setAddedphotos] = useState([]);
    const [photoLink, setPhotolink] = useState("");
    const [description, setDescription] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckin] = useState('');
    const [checkOut, setcheckOut] = useState("");
    const [max, setMax] = useState(1);
    const [price,setPrice]=useState(1)
    const [redirect, setRedirect] = useState(false)
    axios.defaults.withCredentials = true;
    const [places, setPlaces] = new useState([])
    const[edit,setEdit]=useState(false)
    // /Account/places/edit/:id

    useEffect(() => {
        
        if (!id) {
            return;
        }
        axios.get("/places/edit/" + id).then(response => {
           
            const { data } = response
            
            setTitle(data.title)
           
            setDescription(data.description)
            setAddress(data.address)
            setAddedphotos(data.addedphotos)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckin(data.checkIn)
            setcheckOut(data.checkOut)
            setMax(data.max)
            setPrice(data.price)
            setEdit(true)

           
        })

    }, [id])
    useEffect(() => {
        axios.get("/user-places").then(({ data }) => {
            setPlaces(data)
        })
    }, [])

    if(edit){
        console.log(title)
        i=id;
        editOrNew=true
       
        return(<Navigate to ={"/account/places/new"}></Navigate>)

    }
    function checkBox(ev) {
        const { checked, name } = ev.target
        if (checked) {
            setPerks([...perks, name])

        }
        else {
            setPerks(...perks.filter(s => s !== name))

        }
    }
    /*
    async function uploadPhoto(ev) {
        const files = ev.target.files
        const data = new FormData();
        data.set('photos', files)
        await axios.post('/upload', data, {
            headers: { 'Content-type': "multipart/form-data" }
        })


    }
    */
   
    async function newAndEdit(ev) {
        const place = { title, address, addedphotos, description, perks, extraInfo, checkIn, checkOut, max ,price}
        ev.preventDefault()
      
        if(editOrNew){
            console.log(i)
            await axios.put("/places", {i,...place})
           editOrNew=false
           setRedirect(true)
        }
        else{
            await axios.post("/places", place)
            setRedirect(true)
        }
      
 
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault()

        const { data: filename } = await axios.post('/upload', { link: photoLink })
        setAddedphotos(prev => {
            return [...prev, filename]
        })
        setPhotolink("")

    }
    if (redirect) {
        return (<Navigate to={"/account/places"}></Navigate>
        )
    }

    return (
        <div>
            {action !== "new" && (
                <div>
                    <div className="text-center">

                        <Link className="inline-flex bg-pr py-2 px-4 rounded-full gap-2" to={"/account/places/new"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWwidth="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            add new place
                        </Link>


                    </div>
                    <div className="mt-4">
                        {places.length > 0 && (places.map(place => (
                            <Link to={'/Account/places/edit/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                                <div className="flex w-32 h-32 bg-gray-300 shrink-0  ">
                                    {places.length > 0 && (
                                        <img className="object-cover" src={"http://localhost:3000/upload/"+place.addedphotos[0]} />
                                    )}


                                </div>
                                <div className="grow-0 shrink">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-sm mt-2 ">{place.description}</p>
                                </div>




                            </Link>
                        )))}

                    </div>


                </div>
            )}
            {(action === "new") && (
                <div>
                    <form onSubmit={newAndEdit}>
                        <h2 className="text-2xl mt-4">title</h2>
                        <p className="text-gray-500 text-sm">title for your place</p>
                        <input value={title} onChange={(ev) => { setTitle(ev.target.value) }} type="text" placeholder="title for example , my lovley apartment"></input>
                        <h2 className="text-2xl mt-4">address</h2>
                        <p className="text-gray-500 text-sm">detailed address is required </p>
                        <input value={address} onChange={(ev) => { setAddress(ev.target.value) }} type="text" placeholder="address"></input>
                        <h2 className="text-2xl mt-4">photos</h2>
                        <p className="text-gray-500 text-sm">more photos is better </p>
                        <div className="flex gap-2">
                            <input value={photoLink} onChange={(ev) => { setPhotolink(ev.target.value) }} type="text" placeholder="add using a link " />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">add&nbsp;photo</button>
                        </div>

                        <div className="gap-2 mt-2 grid grid-cols-3 lg:grid-col-6 md:grid-col-4">
                            {addedphotos.length > 0 && addedphotos.map(link => (
                                <div className="flex h-32">
                                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:3000/upload/" + link} />
                                </div>
                            ))}

                            <label className="flex cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl  p-8 text-2xl">
                                <input type="file" className="hidden"></input>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                                    <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                                </svg>
                                upload
                            </label>

                        </div>
                        <h2 className="text-2xl mt-4">description</h2>
                        <p className="text-gray-500 text-sm">description for the place </p>
                        <textarea value={description} onChange={(ev) => { setDescription(ev.target.value) }} />
                        <h2 className="text-2xl mt-4">perks</h2>
                        <p className="text-gray-500 text-sm">select the perks of your place</p>
                        <div className="grid  gap-8 grid-cols-2 md:grid-cols-3 md:grid-cols-6 mt-2">
                            <label className="border p-4 flex rounded-2xl gap-2 items-center ">
                                <input name="wifi" onClick={checkBox} type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                                <span>wifi</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center " >
                                <input name="beinsport" onClick={checkBox} type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M19.5 6h-15v9h15V6Z" />
                                    <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
                                </svg>
                                <span>bein&nbsp;sport</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center ">
                                <input name="garage" onClick={checkBox} type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                                    <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                                    <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                                </svg>

                                <span>grage</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center ">
                                <input name="ac" onClick={checkBox} type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                </svg>
                                <span>Ac</span>
                            </label>
                        </div>
                        <h2 className="text-2xl mt-4">extra info</h2>
                        <p className="text-gray-500 text-sm">recomendded places to go,etc </p>
                        <textarea value={extraInfo} onChange={(ev) => { setExtraInfo(ev.target.value) }} />
                        <h2 className="text-2xl mt-4">check in and out times, max guest</h2>
                        <p className="text-gray-500 text-sm">check in and out times, max guest </p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                            <div >
                                <h3 className="mt-2 -mb-1">check in time</h3>
                                <input value={checkIn} onChange={(ev) => { setCheckin(ev.target.value) }} type="text" placeholder="13:00 " />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">check out time</h3>
                                <input value={checkOut} onChange={(ev) => { setcheckOut(ev.target.value) }} type="text" placeholder="14:00 " />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">max number of guests</h3>
                                <input value={max} onChange={(ev) => { setMax(ev.target.value) }} type="number" placeholder="4 " />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">the price</h3>
                                <input value={price} onChange={(ev) => { setPrice(ev.target.value) }} type="number" placeholder="4 " />

                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="submit" className="mt-10 px-5 py-3 text-base font-medium text-center text-white bg-pr rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">save</button>
                        </div>
                    </form>
                </div>
            )}




        </div>

    )
}
