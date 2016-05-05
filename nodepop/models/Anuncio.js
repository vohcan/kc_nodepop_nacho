/**
 * Created by vohcan on 4/5/16.
 */
"use strict";

var mongoose= require("mongoose");

//creamos esquema

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});
//hacer metodo estático
anuncioSchema.statics.list = function(filter, start, limit, sort, cb){
    var query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(cb);
};


//asignamos a modelo

var Anuncio = mongoose.model("Anuncio",anuncioSchema);