const mongoose = require("mongoose");
// const database = ;
mongoose.connect(process.env.mongodb).then(() => {
    console.log("connection succesfully")
}).catch((e) => {
    console.log("somethings error", e)
})