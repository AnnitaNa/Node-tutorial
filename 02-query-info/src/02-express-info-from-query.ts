import express from 'express'

const app = express();
const port: number = Number(process.env.PORT) || 3000;

//! QUERY
//reads everything after ?   -> ex.: http://localhost:3000/info?nome=eu&age=13
app.get('/info', (req, res) => {
    const query = req.query; 
                                
    res
    .status(200)
    .send(query);

    console.log(query)
})

//! ROUTE PARAMETER  
// reads parameter after  : -> ex. localhost:3000/products/12/name/produtinho
app.get('/products/:productId/name/:productName', (req,res) => {    
     
    //the ROUTE PARAM will be inside req.params
    const {productId, productName} = req.params; // desestructuring
    
    res
    .status(200)
    .send(`product ID: ${productId} / product NAME: ${productName}`)
})

app.listen(port)