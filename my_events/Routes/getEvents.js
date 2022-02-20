const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const getEvent = require("../schema/EventsSchema")

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {
    let event = await getEvent.find({id_user: req.body.id_user})
    res.send(event)
})

router.post("/:id", async (req, res, next) => {
    let event = await getEvent.find({_id: req.body._id})
    res.send(event)
})

router.post("/user/:id", async (req, res, next) => {
    let event = await getEvent.find({id_user: req.body.id_user})
    res.send(event)
})

module.exports = router;