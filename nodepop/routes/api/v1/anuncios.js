/**
 * Created by vohcan on 4/5/16.
 */
"use strict";
var express= require("express");
var router = express.Router();



var mongoose= require("mongoose");
var Anuncio= mongoose.model("Anuncio");

//usando metodos estaticos
router.get ("/", function(req, res, next){
    
    var nombre= req.query.nombre;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    
    var criteria= {};
    
    if (typeof nombre !== "undefined"){
        criteria.nombre = nombre;
    }
    Anuncio.lista (criteria, start,limit,sort,function (err,rows) {
        if(err) {
            res.json({success: false, error: err});
            return;
        }
        res.json({success: true, rows: rows});
    });
});


//listado completo de anuncios

/*router.get("/", function (req,res, next){
    
    var name= req.query.nombre;

   var criteria = {};
    if(typeof name !== "undefined"){
        criteria.nombre = name;
    }

   
//filtrado por nombre
    var query =Anuncio.find(criteria);

    //ordenado de forma descendente
    query.sort({nombre:-1});
    
    query.exec(function(err,rows){
        if(err){
            next(err);
            return;
        }
        res.json({success: true, rows: rows});
    });
});

*/

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