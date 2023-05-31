import express from "express";
import ProductManager from './clases/ProductManager.js'

const app = express();
const prueba = new ProductManager("./src/archivos/ProductList.json");

app.get("/products", async (req, res) => {
    const limite = req.query.limit, aux = await prueba.getProducts();
    const obj = {productos: []};

    if(limite<aux.length){
        for (let i = 0; i < limite; i++) {
            obj.productos.push(aux[i]);
        }
    } else {
        obj.productos = aux;
    } 
    
    res.send(obj)
})

app.get("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    res.send(await prueba.getProductById(id))
})


app.listen(8080, () => console.log("escuchando en el servidor 8080"))