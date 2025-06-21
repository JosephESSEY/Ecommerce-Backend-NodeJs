const { addProduct, updateProduct, findProductById, getAProduct, deleteProduct, allProduct } = require('../models/product.model')

exports.addP = async (req, res) =>{
    try {
        const {name, description, price, stock, category_id} = req.body;
        const filePath = req.file ? req.file.filename : null;

        const newProduct = await addProduct(name, description, price, stock, filePath, category_id);

        return res.status(201).json({
            message : "Produit created successfully",
            product : newProduct
        })
    } catch (error) {
        res.status(500).json({
            message : "Error creating product",
            error : error
        })
    }
}

exports.updateP = async (req, res) => {
    try {
        const { name, description, price, stock, category_id} = req.body;
        const id = req.params.id;
        const filePath = req.file ? req.file.filename : null;
        const existingProduct = await findProductById(id);
        if(!existingProduct) return res.status(404).json({message : "Product not found"});
        const result = await updateProduct(name, description, price, stock, filePath, category_id, id);
        return res.status(201).json({
            message : "Product updated successfuly",
            product : result
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Error updating product",
            error : error
        })
    }
}

exports.allP = async (req, res) => {
    try {
        const products = await allProduct();
        res.status(200).json({
            message: "List of Products",
            products : products
        })
    } catch (error) {
        res.status(500).json({
            message : "Error retrieving products",
            error : error
        })
    }
}

exports.getP = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getAProduct(id);
        if(!product) return res.status(404).json("Product not found");
        res.status(200).json({
            message: "Product",
            product : product
        })
    } catch (error) {
        res.status(500).json({
            message : "Error retrieving product",
            error : error
        })
    }
}


exports.deleteP = async (req, res) => {
    try {
        const id = req.params.id;
        const existingProduct = await findProductById(id);
        if(!existingProduct) return res.status(404).json({message : "Product not found"});
        const result = await deleteProduct(id);
        return res.status(204).json({
            message : "Product deleted successfuly",
            product : result
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Error deleting product",
            error : error
        })
    }
}
