const {addCart, getUserCart, getQuantity, setQuantity, addProductCart, verifyProductCart, deleteProductInCart, cartModel, getTotalPriceCart, setTotalPriceCart} = require('../models/cart.model');
const { getAProduct } = require('../models/product.model');

const addProductToCartController = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const product_id = req.body.product_id;

        const product = await getAProduct(product_id);
        if(!product) return res.status(404).json("Product not found");
        const price = parseInt(product.price);

        const existingCart = await getUserCart(user_id);

        if(!existingCart){
            const newCart = await addCart(user_id);
            const existingProductInCart = await verifyProductCart(newCart.id, product_id);
            if(!existingProductInCart){
                const newProductCart = await addProductCart(newCart.id, product_id, price);
                return res.status(201).json({message: 'Product added to cart', newProductCart});
            }else{
                const quantity = await getQuantity(newCart.id, product_id);
                const newQuantity = parseInt(quantity) + 1;
                const newPrice = newQuantity * parseInt(price);
                const setNewQuantity = await setQuantity(newCart.id, product_id, newQuantity, newPrice);
                const total = await getTotalPriceCart(newCart.id);
                await setTotalPriceCart(total, user_id);
                return res.status(200).json({message: 'Product quantity updated', setNewQuantity});
            }
        }else{
            const existingProductInCart = await verifyProductCart(existingCart.id, product_id);
            if(!existingProductInCart){
                const newProductCart = await addProductCart(existingCart.id, product_id, price);
                return res.status(201).json({message: 'Product added to cart', newProductCart});
            }else{
                const quantity = await getQuantity(existingCart.id, product_id);
                const newQuantity = parseInt(quantity.quantity) + 1;
                const newPrice = newQuantity * parseInt(price);
                const setNewQuantity = await setQuantity(existingCart.id, product_id, newQuantity, newPrice);
                const total = await getTotalPriceCart(existingCart.id);
                await setTotalPriceCart(total, user_id);
                return res.status(200).json({message: 'Product quantity updated', setNewQuantity});
            }
        }
    } catch (error) {
        return res.status(400).json({
            message: "Server Error",
            error: error
        })
    }
}

const IncreaseQuantity = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const {cart_id, product_id} = req.body;
        const product = await getAProduct(product_id);
        if(!product) return res.status(404).json("Product not found");
        const price = parseInt(product.price);
        const quantity = await getQuantity(cart_id, product_id);
        const newQuantity = parseInt(quantity.quantity) + 1;
        const newPrice = newQuantity * parseInt(price);
        const setNewQuantity = await setQuantity(cart_id, product_id, newQuantity, newPrice);
        const total = await getTotalPriceCart(cart_id);
        await setTotalPriceCart(total, user_id);
        return res.status(200).json({message: 'Product quantity updated', setNewQuantity});
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
}

const ReduceQuantity = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const {cart_id, product_id} = req.body;
        const product = await getAProduct(product_id);
        if(!product) return res.status(404).json("Product not found");
        const price = parseInt(product.price);
        const quantity = await getQuantity(cart_id, product_id);
        if(parseInt(quantity.quantity) > 1){
            const newQuantity = parseInt(quantity.quantity) - 1;
            const newPrice = newQuantity * parseInt(price);
            const setNewQuantity = await setQuantity(cart_id, product_id, newQuantity, newPrice);
            const total = await getTotalPriceCart(cart_id);
            await setTotalPriceCart(total, user_id);
            return res.status(200).json({message: 'Product quantity updated', setNewQuantity});
        }else{
            return
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
}

const deleteProductInCartController = async (req, res) => {
    try {
        const {cart_id, product_id} = req.body;
        const deleteProduct = await deleteProductInCart(cart_id, product_id);
        return res.status(204).json({
            message: 'Product deleted from cart',
            data: deleteProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
}

const cart = async (req, res) => {
    try {
        const cart_id = req.user.userId;
        const cart = await cartModel(cart_id);
        return res.status(200).json({
            message: 'User Cart retrived successfuly',
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            error: error
        })
    }
}

module.exports = {
    addProductToCartController,
    IncreaseQuantity,
    ReduceQuantity,
    deleteProductInCartController,
    cart
}