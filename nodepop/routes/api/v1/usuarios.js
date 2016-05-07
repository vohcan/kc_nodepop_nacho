/**
 * Created by vohcan on 5/5/16.
 */
"use strict";
var jwt= require("jsonwebtoken");
var config = require('../../../local_config');
var crypto= require ("crypto");
var express= require("express");
var router = express.Router();
var Usuario = require("mongoose").model("Usuario");



router.post("/authenticate", function(req, res){
   var user = req.body.user;
    var pass =req.body.pass;
    var email =req.body.email;

    var passHash = crypto.createHash('md5').update(pass).digest("hex");

    Usuario.findOne ({user: user}).exec(function(err, user){
        if(err) {
            res.status(500).json({success: false, error: err});
            return;
        }
        if (!user){
            res.status(401).json({success: false, error: "Auth failed. user not found."});
            return;
        }

        if (user.pass !== pass) {
            res.status(401).json({success: false, error: 'Auth failed. invalid password.'});
            return;
        }
        var token = jwt.sign({id: user._id}, config.jwt.secret,{ expiresIn: "2 days"

        });
        res.json({success: true, token: token});
        
    });
});

module.exports = router;
