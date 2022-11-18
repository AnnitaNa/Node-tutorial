import express from "express";
import path from "path";
import fs from "fs";

import { Iproducts } from "./utils/Iproducts.js";
import { products } from "./utils/products.js"; // ! put the EXTESTION it will be afeter transpiled (data.ts -> data.js)

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const __dirname: string = path.resolve();
const jsonPath: string = path.join(__dirname, "./src/utils/data.json");

//-----------------------------------------------------------------------------------------------
//-----------------------------------     MIDDLEWARES     ---------------------------------------
//-----------------------------------------------------------------------------------------------

app.use(express.static("./src/utils"));
app.use(express.json()); //parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies using qs library

//-----------------------------------------------------------------------------------------------
//---------------------------------     GET AND GETALL     --------------------------------------
//-----------------------------------------------------------------------------------------------

// * GET
app.get("/product", (req, res) => {
    //! GET ALL
    let productFiltered = products.map((product: Iproducts) => {
        const { title, body }: Iproducts = product;
        return { title, body };
    });
    res.json(productFiltered);
});

// * GET BY ID
app.get("/product/:productId", (req, res) => {
    //! GET BY ID

    const { productId }: { productId: string } = req.params;

    let product = products.find(
        (product: Iproducts) => product.id === Number(productId)
    );
    if (!product)
        return res.status(404).send("this ID doesn't exist in our database");

    res.json(product);
});

// * GET WITH FILTER
// ex.: localhost:3000/filter?search=q&limit=1
app.get("/filter", (req, res) => {
    //search for initials and limit number of returns

    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.title.startsWith(String(search));
        });
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if (sortedProducts.length < 1) {
        return res.status(200).json({ sucess: true, data: [] });
    }

    res.json(sortedProducts);
});

//-----------------------------------------------------------------------------------------------
//--------------------------------------     POST     -------------------------------------------
//-----------------------------------------------------------------------------------------------

app.post("/product", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        //request body must be valid and not empty
        return res.status(400).send("request body not valid");
    }

    let data = fs.readFileSync(jsonPath, { encoding: "utf-8" });
    let products = JSON.parse(data); //converts json to js

    products.map((product: Iproducts) => {
        if (product.id === req.body.id) {
            // id must not already exist
            return res.status(400).send("this Id is already on our database");
        }
    });

    res.status(201).send(req.body);
    products.push(req.body);

    fs.writeFileSync(jsonPath, JSON.stringify(products), "utf-8");
});

//-----------------------------------------------------------------------------------------------
//---------------------------------------     PUT     -------------------------------------------
//-----------------------------------------------------------------------------------------------

app.put("/product/:id", (req, res) => {
    const { id }: { id: string } = req.params;

    let data = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8" }));

    let updated = data.map((obj: Iproducts) => {
        if (obj.id === Number(id)) {
            obj = req.body;
        }
        return obj;
    });

    fs.writeFileSync(jsonPath, JSON.stringify(updated), "utf-8");

    res.status(200).send("updated");
});

//-----------------------------------------------------------------------------------------------
//-------------------------------------     DELETE     ------------------------------------------
//-----------------------------------------------------------------------------------------------

app.delete("/product/:id", (req, res) => {
    const { id }: { id: string } = req.params;
    console.log(id);

    let products = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8" }));

    let foundProduct = products.find((product: Iproducts) => {
        return product.id == Number(id);
    });

    if (!foundProduct) {
        return res.status(404).send("not found");
    }

    let notDeleted = products.filter((product: Iproducts) => {
        return product.id !== Number(id);
    });

    fs.writeFileSync(jsonPath, JSON.stringify(notDeleted), "utf-8");
    res.status(200).send("deleted");
});

//-----------------------------------------------------------------------------------------------
//--------------------------------------    OTHERS     ------------------------------------------
//-----------------------------------------------------------------------------------------------

app.all("*", (req, res) => {
    res.status(404).send("not found");
});

app.listen(port, () => {
    console.log(`listing to ${port}`);
});
