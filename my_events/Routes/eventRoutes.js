const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Event = require('../schema/EventsSchema');

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {
    let id_user = req.body.id_user;
    let adress_event = req.body.adress;
    let date_event = req.body.date;
    let description = req.body.description;
    let title = req.body.title;
    let organisateur = req.body.organisateur;
    let status = req.body.status;
    let guest = req.body.guest;
    let picture = req.body.picture;
    let lo = req.body.lo;
    let la = req.body.la;

    if(id_user && adress_event && date_event && description && title && status && guest && picture && organisateur && lo && la) {
        let data = req.body;
        Event.create(data)
    } else {
        console.log("rip");
    }

})
module.exports = router;