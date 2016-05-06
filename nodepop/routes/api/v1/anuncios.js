/**
 * Created by vohcan on 4/5/16.
 */
"use strict";
var express= require("express");
var router = express.Router();



var mongoose= require("mongoose");
var Anuncio= mongoose.model("Anuncio");

//auth
var jwtAuth = require('../../../lib/jwtAuth');
router.use(jwtAuth());

//usando metodos estaticos
router.get ("/", function(req, res, next){
    
    var nombre= req.query.nombre;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;
    
    var venta = req.query.venta;
    var tags= req.query.tags;
    var precio= req.query.precio;

    
    var criteria= {};
    
    if (typeof nombre !== "undefined"){

        //case unsensitive
        criteria.nombre= {$regex: nombre, $options: "i" };

    }
    Anuncio.lista (criteria, start,limit,sort,function (err,rows) {
        if(err) {
            res.json({success: false, error: err});
            return;
        }
        res.json({success: true, rows: rows});
    });
});

//sacar ventas
router.get("/ventas", function(req, res){
    var ventas= req.query.venta = true;
    Anuncio.find({venta:ventas}).exec(function(err, ventas){
        if(err){
            next(err);
            return;
        }
        res.json({success: true, ventas: ventas});
    });
});
//sacar compras
router.get("/compras", function(req, res){
    var compras= req.query.venta = false;
    Anuncio.find({venta:compras}).exec(function(err, compras){
        if(err){
            next(err);
            return;
        }
        res.json({success: true, compras: compras});
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

//crear anuncios nuevos
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