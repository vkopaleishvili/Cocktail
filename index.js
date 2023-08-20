import express, { response } from "express";
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
let url = urlRandom;
var cocktails;
var count = 0;

app.get("/", async (req,res) => {
    try 
    {
const result = await axios.get(url);
cocktails = result.data.drinks;
const drink = cocktails[count];
    res.render("index.ejs", {
        drinkImg: drink.strDrinkThumb,
        name: drink.strDrink,
        instructions:  drink.strInstructions,
        ingredient: [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5], 
    });
    } catch (error) {
        // res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      } 
})




app.post("/getrecipe", async (req,res) => {
        url = urlName + req.body.coctailName;
        count = 0;
res.redirect("/");
})

app.post("/findCocktailbyLetter", (req,res) => {
        url = urlName + req.body.strDrinkLetter.charAt(0);
        count = 0;
res.redirect("/");
})

app.post("/findCockTailByIngredient", (req,res) => {
    url = urlName + req.body.strIngredient;
    count = 0;
res.redirect("/");
})



app.post("/nextItem", (req,res) => {
        if (count < cocktails.length) {
            count = count + 1;
            console.log(count);
} if (count === cocktails.length) {
    count = 0;
    count = count + 1;
}
res.redirect("/");
})

app.post("/previousItem", (req,res) => {
    if (count > 0) {
        count = count - 1;
        console.log(count);
} if (count === 0) {
count = cocktails.length;
count = count - 1;
}
res.redirect("/");
})