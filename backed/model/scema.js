const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    payment: [{
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        tittle: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        deleted: {
            type: String,

        }

    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})




userschema.methods.generatetoken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.secret_key);
        console.log("token about")
        this.tokens = this.tokens.concat({ token, token })
        await this.save();
        return token;

    } catch (e) {
        console.log("auth error", e);
    }
}


userschema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10)
    }
    next();
})

userschema.methods.addmessage = async function(name, mobile, address, email, photo, image, price, tittle) {
    try {
        this.payment = this.payment.concat({ name, mobile, address, email, photo, image, price, tittle });
        await this.save();
        return this.payment;
    } catch (e) {
        console.log(e);
    }
}



userschema.methods.insertdata = async function() {
    try {

        const useless = new Date().toLocaleString();
        console.log(useless, (typeof useless));
        this.payment[0].deleted = (useless);
        await this.save();
        return this.payment[0].deleted;
        console.log("baba black site")


    } catch (e) {
        console.log("auth error", e);
    }
}
module.exports = mongoose.model("hoteldata", userschema);