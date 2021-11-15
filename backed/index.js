const express = require("express");
const app = express();
const dotenv = require("dotenv");
var bodyParser = require('body-parser')
const path = require("path");
dotenv.config({ path: './config.env' })
var cookieParser = require('cookie-parser')
const multer = require("multer")
const port = process.env.port || 8000;
const bcrypt = require("bcryptjs");
const data = require("./model/scema");
const auth = require("./middle/auth");
const { off } = require("./model/scema");
require("./data/connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())



const staticpath = (path.join(__dirname, "./public"))
app.use(express.static(staticpath));


const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

var upload = multer({
    storage: imageStorage,
})


app.post("/frist", async(req, res) => {
    const { name, number, email, password, cpassword } = req.body;

    if (!name || !number || !email || !password || !cpassword) {
        return res.status(422).json("invalid")
    }
    try {
        const cheak = await data.findOne({ email: email });
        if (cheak) {
            return res.status(422).json("email invalid")
        } else if (password !== cpassword) {
            return res.status(422).json("password invalid")
        } else {
            const user = new data({ name, number, email, password, cpassword });
            await user.save();
            res.status(201).json("ok")
        }

    } catch (e) {
        res.send(e);
        console.log("register failed", e);
    }
})


app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json("error")
        }

        const usemail = await data.findOne({ email: email });


        const token = await usemail.generatetoken();

        res.cookie("web", token, {
            expires: new Date(Date.now() + 2529000000),
            httpOnly: true
        });
        if (usemail) {
            const ismatch = await bcrypt.compare(password, usemail.password);



            if (!ismatch) {
                res.status(400).json("invalid")
            } else {
                res.json("ok")
            }
        } else {
            res.status(400).json("feaild")

        }

    } catch (e) {
        console.log("log in error", e);
    }
})



app.get("/second", auth, async(req, res) => {
    res.send(req.userdata);
})

app.post("/third", [auth, upload.single("photo")], async(req, res) => {
    console.log("this is frist code")
    const { name, mobile, address, email, image, price, tittle } = req.body;
    const photo = req.file.filename;



    if (!name || !mobile || !address || !email || !photo || !image || !price || !tittle) {
        return res.status(422).json("something error")
    }
    try {
        const usercontact = await data.findOne({ _id: req.userid });
        if (usercontact) {
            const message = await usercontact.addmessage(name, mobile, address, email, photo, image, price, tittle)
            await usercontact.save();
            res.status(201).json("this is ok");
        }

    } catch (e) {
        console.log("around code problem", e);
        res.status(401).json("something error1")
    }
})


app.post("/four", auth, async(req, res) => {

    const email = (req.body.email);
    const tittle = (req.body.tittle);
    const id = (req.body.id);


    try {
        const finddata = await data.findOne({ "_id": req.userid }, { payment: { $elemMatch: { _id: id } } });


        const raju = await finddata.insertdata();


        res.status(201).json("ok find data")
    } catch (e) {
        console.log("baba problem", e)
    }
})

app.get("/six", auth, async(req, res) => {
    res.send(req.userdata);
})

app.get("/seven", auth, async(req, res) => {
    res.send(req.userdata);
})


app.put("/eight", [auth, upload.single("photo")], async(req, res) => {
    console.log("this i s", req.body.photo)
    console.log("back", req.file);
    try {

        if (req.file === undefined) {
            const id = req.body.id;

            const finddata = await data.updateOne({ _id: req.userid, "payment._id": id }, {
                $set: {
                    "payment.$.name": req.body.name,
                    "payment.$.mobile": req.body.mobile,
                    "payment.$.address": req.body.address,
                    "payment.$.email": req.body.email,
                    // "payment.$.photo": req.file.filename
                }
            });



            console.log("jagga duniya")
            if (finddata) {
                res.status(201).json("every things is ok")
            } else {
                res.status(404).josn("fault")
            }
        } else {
            const id = req.body.id;

            const finddata = await data.updateOne({ _id: req.userid, "payment._id": id }, {
                $set: {
                    "payment.$.name": req.body.name,
                    "payment.$.mobile": req.body.mobile,
                    "payment.$.address": req.body.address,
                    "payment.$.email": req.body.email,
                    "payment.$.photo": req.file.filename
                }
            });



            console.log("jagga duniya")
            if (finddata) {
                res.status(201).json("every things is ok")
            } else {
                res.status(404).josn("fault")
            }
        }


    } catch (e) {
        console.log("something fault", e)
    }

})


app.get("/logout", (req, res) => {
    res.clearCookie("web");
    res.status(201).json("use logout")
})


//for setup heruk
// if (process.env.NODE_EVN == "production") {
//     app.use(express.static("fornt/build"))

// }
app.listen(port, () => {
    console.log("server is running 5000");
})