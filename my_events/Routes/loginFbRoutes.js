const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const UserFb = require('../schema/UsersSchemaFb')

app.use(bodyParser.urlencoded({ extended: true }))

router.post("/", async (req, res, next) => {

    let email = req.body.email

    if(email) {
        let user = await UserFb.findOne({
            $or: [
                { email: email },                
            ]
        })
            .catch((error) => {
                console.log(error);
            });
        if (user == null) {
            let data = req.body
            UserFb.create(data)
        } else {
            req.session.user = user;
            res.send(req.session);
        }
    }
})

module.exports = router;