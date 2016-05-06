/**
 * Created by vohcan on 5/5/16.
 */
"use strict";

var mongoose = require("mongoose");

//esquema de usuario
var usuarioSchema = mongoose.Schema({
    user: String,
    email: {
        type: String,
        index: true
    },
    pass: String

});

var Usuario = mongoose.model("Usuario", usuarioSchema);