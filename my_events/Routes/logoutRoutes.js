const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {
    req.session.destroy();
    console.log("logout");
    console.log(req.session);
})

module.exports = router;
