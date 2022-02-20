const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Chat = require('../schema/ChatSchema')

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {
    const id_event = req.body.id_event;
    const name = req.body.name;
    const message = req.body.message;

    if(id_event && name && message) {
        const data = req.body;
        Chat.create(data)
    } else {
        console.log('rip');
    }
})

router.post("/:id", async (req, res, next) => {
    let event = await Chat.find({id_event: req.body.id_event})
    res.send(event)
})

module.exports = router;