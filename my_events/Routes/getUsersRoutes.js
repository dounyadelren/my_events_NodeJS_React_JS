const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const UserFb = require('../schema/UsersSchemaFb')

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {

    const id = req.body.id

    let users = await UserFb .find({})
    let filtre = users.filter(user => user._id != id)
    res.send(filtre)
})

router.post("/:id", async (req, res, next) => {
    let users = await UserFb .find({_id : req.body.id})
    res.send(users)
})

module.exports = router;    