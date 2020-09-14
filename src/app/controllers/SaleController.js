const { Sale } = require("../models");
const { User } = require("../models");

class SaleController {
  async list(req, res) {
    Sale.hasOne(User, { foreignKey: "sales_seller_id_fkey" });

    const sales = await Sale.findAll({
      include: [{ model: User, as: "seller_id" }],
    });

    res.json(sales);
  }

  async store(req, res) {
    const { userId } = req;
    const { totalValue } = req.body;

    if (!totalValue) {
      return res
        .status(401)
        .json({ error: { message: "Valor total obrigatorio." } });
    }

    const sale = await Sale.create({
      total_value: totalValue,
      seller_id: userId,
    });

    return res.json(sale);
  }
}

module.exports = new SaleController();
