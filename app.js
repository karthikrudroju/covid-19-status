const express = require("express");
const app = express();
const ejs = require("ejs");
const axios = require("axios");

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    axios.get("https://corona.lmao.ninja/v2/all?yesterday")
    .then((response) => {
        const totalConfirmed = response.data.cases;
        const totalDeaths = response.data.deaths;
        const totalRecovered = response.data.recovered;
        res.render("index", {tConfirmed: totalConfirmed, tDeaths: totalDeaths, tRecovered: totalRecovered});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server has started on port 3000.");
});