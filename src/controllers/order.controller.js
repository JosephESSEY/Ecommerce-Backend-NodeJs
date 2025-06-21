const { addOrder, addOrderLine } = require('../models/order.model');
const { cartModel } = require('../models/cart.model');

const validateOrder = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const cart = await cartModel(user_id);

    if (!cart?.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const prix_total_panier = cart.length > 0 ? parseFloat(cart[0].prix_total_panier || 0) : 0;

    const totalPrice = parseFloat(prix_total_panier.toFixed(2));

    const order = await addOrder(user_id, totalPrice);
    if (!order?.id) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    const orderLines = await Promise.all(
      cart.map(async (item) => {
        return await addOrderLine(
          order.id,
          item.product_id,
          item.quantity,
          parseFloat(item.prix_total || 0).toFixed(2)
        );
      })
    );

    return res.status(200).json({
      message: "Order created successfully",
      order,
      orderLines,
    });
  } catch (error) {
    console.error("Order Error:", error);
    return res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

module.exports = {
    validateOrder
}