const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const UserFb = require('../schema/UsersSchemaFb')

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {

    const user_id = req.body.id
    UserFb.findByIdAndUpdate(user_id, { description: req.body.description },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs);
            }
        });
})
module.exports = router;