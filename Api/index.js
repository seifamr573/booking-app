const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/user");
const bycrpt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const Place = require("./models/place")
const jwt = require("jsonwebtoken")
const Booking = require("./models/bookings")
const salt = bycrpt.genSaltSync(10);
const jwtSecret = "hghlgfmh;fmhfmh;dfa;ld;la;z"

m_url = "mongodb+srv://seifeldeenamr:NJksj9sG6fjiJBwN@bookingapp.lba7cif.mongodb.net/?retryWrites=true&w=majority&appName=bookingApp"

mongoose.connect(m_url)
app.use("/upload", express.static(__dirname + "/uploads"))
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.get("/test", (req, res) => {

    res.json("test ok")
})

app.post("/register", async (req, res) => {
    const n = req.body.name;
    const p = req.body.password;
    const e = req.body.email;
    const u = await User.create({
        name: n,
        email: e,
        password: bycrpt.hashSync(p, salt),

    })
    res.json(u)


})
app.get("/places", async (req, res) => {
    res.json(await Place.find())

})
app.get("/user-places", (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) {
            throw err;

        }
        const { id } = info

        res.json(await Place.find({ owner: id }))
    })




})
app.get("/place/:id", async (req, res) => {
    const { id } = req.params
    console.log(id)
    res.json(await Place.findById(id))
})

app.get("/places/edit/:id", async (req, res) => {
    const { id } = (req.params)

    res.json(await Place.findById(id))
})
app.post("/places", (req, res) => {

    const { token } = req.cookies;
    const { title, address, addedphotos, description, perks, extraInfo, checkIn, checkOut, max, price } = req.body
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) {
            throw err;

        }
        const placeDoc = await Place.create({
            owner: info.id,
            title, address, addedphotos,
            description, perks, extraInfo,
            checkIn, checkOut, max, price


        })

        res.json(placeDoc)
    })


})





app.post('/Login', async (req, res) => {
    const e = req.body.email

    const p = req.body.password;
    const userDoc = await User.findOne({ email: e }).exec();

    if (userDoc) {
        const pCorrect = bycrpt.compareSync(p, userDoc.password)
        if (pCorrect) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                name: userDoc.name
            }, jwtSecret, {

            }, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(userDoc);

            });

        }
        else {
            res.json("not correct")

        }
    }
    else {
        res.json("not found")

    }
})
app.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const { i, title,
        address,
        addedphotos,
        description,
        perks, extraInfo,
        checkIn, checkOut, max, price

    } = req.body
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) {
            throw err;

        }
        console.log(i)
        const doc = await Place.findById(i)
        console.log(doc)
        // if (info.id === doc.owner.toString()) {
        doc.set({
            title,
            address,
            addedphotos,
            description,
            perks, extraInfo,
            checkIn, checkOut, max, price

        })
        await doc.save();
        res.json("ok")
        // }

    })

})

app.post("/upload", async (req, res) => {
    const { link } = req.body

    const n = Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + n
    })
    res.json(n)
})

app.post("/logout", (req, res) => {
    res.cookie("token", '').json(true);


})



app.get("/profile", (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, info) => {
            if (err) {
                throw err;

            }
            res.json(info)

        })
    }
    else {
        res.json("")
    }
    //res.json({token})
})

app.post("/booking", (req, res) => {
    const { place, checkIn,name,
        checkOut, number
        , phone, price } = req.body
 Booking.create({
        place, checkIn,name,
        checkOut, number
        , phone, price

    }).then((err,doc)=>{
        res.json(doc)
    }).catch((err)=>{
        throw err

    })
    
})



app.listen(3000, () => { console.log("working") });