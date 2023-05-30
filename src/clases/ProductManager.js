import fs from "fs"

export default class ProductManager {
    
    constructor (path) {
        this.path = path;
    }
    
    getProducts = async () => {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } 
        catch {
            console.log("Archivo inexistente, creando...");
            fs.promises.writeFile(this.path, "[]");
        }
    }


    addProduct = async (product) => {
        try {
            if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                products = JSON.parse(products);
                const findCode = products.some(e => e.code === product.code);
                if(findCode) return "el codigo ya fue asignado a otro producto";
                products.length? products.push({...product, ...{id: products[products.length-1].id+1}}) : products.push({...product, ...{id: 0}});
                fs.promises.writeFile(this.path, JSON.stringify(products)); 
            }
            else console.log("No cumple con los campos obligatorios");
        } 
        catch(error){
            console.log(error)
        }
    }

    getProductById = async(id) => {
        try {
            let products = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(products);
            const product = products.find(e => e.id == id);
            if(product) return product;
            return("El producto con el id solicitado no existe");
        } 
        catch(error){
            console.log(error)
        }
    }

    updateProduct = async(product, id) => {
        try {
            let products = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(products);
            const producto = products.find(e => e.id === id);
            if(producto){
                products[products.indexOf(producto)] = {...producto, ...product};
                fs.promises.writeFile(this.path, JSON.stringify(products)); 
            }
            else console.log("No se encontro ningun producto con el id indicado");
        } 
        catch(error){
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try {
            let products = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(products);
            const product = products.find(e => e.id === id);
            if(product){
                products.splice(products.indexOf(product), 1);
                fs.promises.writeFile(this.path, JSON.stringify(products)); 
            } else {
                console.log("No se encontro el producto indicado");
            }
        } 
        catch(error){
            console.log(error)
        }
    }
}
