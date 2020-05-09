!function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=2)}([function(e,o){e.exports=require("express")},function(e,o){e.exports=require("mongoose")},function(e,o,t){e.exports=t(3)},function(e,o,t){const n=t(4),r=t(11),u=t(12);var c=process.env.PORT||"3000";n.set("port",c),r.createServer(n).listen(c,()=>{console.log(u.blue("======================")),console.log(u.bold.white("Listening at port "+u.bold.red(c))),console.log(u.blue("======================"))})},function(e,o,t){(function(o){const n=t(5),r=t(0);t(6);const u=t(8),c=t(9),i=r();i.set("views",n.join(o,"./../views")),i.set("view engine","ejs"),i.use(r.json()),i.use(r.urlencoded({extended:!1})),i.use(r.static(n.join(o,"./../public"))),i.use(u),i.use(c),e.exports=i}).call(this,"src")},function(e,o){e.exports=require("path")},function(e,o,t){t(7).config();const n=t(1);n.connect(process.env.DB_URL,{useNewUrlParser:!0,useUnifiedTopology:!0}).catch(e=>console.log(e));const r=n.connection;r.on("error",e=>console.log(e)),r.once("open",()=>console.log("Connected to mongoose!!"))},function(e,o){e.exports=require("dotenv")},function(e,o,t){const n=t(0).Router();n.get("/",(function(e,o,t){o.render("home",{pageTitle:"Paperback"})})),e.exports=n},function(e,o,t){const n=t(0).Router(),r=t(10);n.get("/author",async(e,o)=>{try{let t={};if(e.query.authorName){const o=new RegExp(e.query.authorName,"i");t.name=o}const n=await r.find(t);o.render("author/index",{pageTitle:"Authors",authors:n})}catch(e){o.render("error",{error:e})}}),n.get("/author/new",(e,o)=>{o.render("author/new",{pageTitle:"Add Author"})}),n.post("/author",async(e,o)=>{try{const t=new r({name:e.body.authorName});await t.save(),o.redirect("/author")}catch(e){o.render("error",{error:e})}}),e.exports=n},function(e,o,t){const n=t(1),r=n.Schema({name:{type:String,required:!0}});e.exports=n.model("Author",r)},function(e,o){e.exports=require("http")},function(e,o){e.exports=require("chalk")}]);