/**
 * Created by vohcan on 5/5/16.
 */
"use strict";

var mongoose = require("mongoose");

//esquema de usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String

});

mongoose.model("Usuario", usuarioSchema);