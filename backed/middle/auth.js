const jwt = require("jsonwebtoken");
const data = require("../model/scema");

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.web;
        const verfy = jwt.verify(token, process.env.secret_key);
        const getdata = await data.findOne({ _id: verfy._id });
        if (!getdata) { throw new Error("user not found") }
        req.token = token;
        req.userdata = getdata;
        req.userid = getdata._id;

        next();

    } catch (e) {
        res.status(401).send("problem hhhh")
        console.log("auth probelm", e);
    }

}
module.exports = auth;