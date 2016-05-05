/**
 * Created by vohcan on 4/5/16.
 */
"use strict";
var express= require("express");
var router = express.Router();



var mongoose= require("mongoose");
var Anuncio= mongoose.model("Anuncio");

//listado completo de anuncios

router.get("/", function (req,res, next){
    
    var name= req.query.nombre;

   var criteria = {};
    if(typeof name !== "undefined"){
        criteria.nombre = name;
    }
   
//filtrado por nombre
    var consulta =Anuncio.find(criteria);
    
    consulta.sort({nombre:-1});
    
    consulta.exec(function(err,rows){
        if(err){
            next(err);
            return;
        }
        res.json({success: true, rows: rows});
    });
});

//filtros 

/*router.get("/filtros", function (req,res, next){

    //filtrar por nombre
    var name= req.query.nombre;

    var criteria={};

    if(typeof name !== "undefined"){
        criteria.nombre = name;
    }
   

    Anuncio.find(criteria).exec(function(err,rows){ 
        if(err){
            next(err);
            return;
        }
        res.json({success: true, rows: rows});
    });
    

    
});*/

//subir anuncios nuevos
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