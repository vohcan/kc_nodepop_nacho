/**
 * Created by vohcan on 3/5/16.
 */
"use strict";
var mongoose=require("mongoose");
var conn= mongoose.connection;

//handlers de eventos de conexion

conn.on("error", console.log.bind(console, "connection error!!"));
conn.once("open", function(){
    console.log("connected to Mongo db!!");
});

//conectar a bbdd de mogo db
mongoose.connect ("mongodb://localhost:27017/nodepopdb");