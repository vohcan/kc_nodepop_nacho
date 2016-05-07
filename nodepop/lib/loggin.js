/**
 * Created by vohcan on 7/5/16.
 */
"use strict";
var express= require("express");
var router = express.Router();
var Usuario = require("mongoose").model("Usuario");

var crypto = require('crypto');

router.post("/registro", function (req, res){
    var user= req.body.user;
    var email= req.body.email;
    var pass = req.body.pass;

    var passencript = encriptar(user,pass);
    Usuario.findOne({user:user}, function(err, user){
        if(!user){
            var nuevouser = new Usuario({
                user: user,
                email: email,
                pass: passencrript
            });
            nuevouser.save(function(err, saved){
                if(err) {
                    next(err);
                    return;
                }
                res.json({success: true, saved: saved});
            });

        }
        else
            res.send("Usuario existente");
    });
});

function encriptar(user, pass){
   var hmac=crypto.createHmac("sha1", user).update(pass).digest("hex");
    return hmac;
}


module.exports = router;