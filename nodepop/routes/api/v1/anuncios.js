/**
 * Created by vohcan on 4/5/16.
 */
"use strict";
var express= require("express");
var router = express.Router();



var mongoose= require("mongoose");
var Anuncio= mongoose.model("Anuncio");

//listado de anuncios
router.get("/", function (req,res, next){
    //filtro por nombre
    var name=req.query.nombre;
    var filter ={};

    if(typeof name !== "undefined"){
        filter.nombre = name;
    }

    var query= Anuncio.find(filter);
    //ordeno por nombre descendente
    query.sort({nombre:-1});



    query.exec(function(err,rows){
        if(err){
            next(err);
            return;
        }
        res.json({success: true, rows: rows});
    });
});


router.post("/", function (req, res, next){
    var anuncio = new Anuncio(req.body);
    console.log(anuncio);
   anuncio.save(function(err, saved){
        if(err) {
            next(err);
            return;
        }
        res.json({success: true, saved: saved});

    });
});

module.exports = router;