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
//asignamos a modelo

mongoose.model("Anuncio",anuncioSchema);