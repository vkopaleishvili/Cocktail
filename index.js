import express from "express";
import bodyparser from "body-parser";
import axios from "axios";

var app = express();
var port = 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.listen(port, ()=> {
    console.log("Server is listening at port: ",  port);
})

let urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
let urlName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

app.get("/", async (req,res) => {
    try 
    {
const result = await axios.get(urlRandom);
const drink = result.data.drinks[0];
// console.log(drink);
        res.render("index.ejs", {
name: drink.strDrink,
instructions:  drink.strInstructions,
ingredient: [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5], 
        });
    } catch (error) {
        // res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
    
})

app.post("/submit", async (req,res) => {
    try 
    {
        console.log("start");
        const url = urlName + req.body.coctailName;
        console.log("URL", url);
const result = await axios.get(url);
const drink = result.data.drinks[0];
// console.log(drink);
res.render("index.ejs", {
    name: drink.strDrink,
    instructions:  drink.strInstructions,
    ingredient: [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5], 
            });
    } catch (error) {
        // res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
    
})