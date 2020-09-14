const { Product } = require("../models");

class ProductController {
  async list(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async index(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    return res.json(product);
  }

  async store(req, res) {
    const { name, unitValue } = req.body;

    if (!name) {
      return res
        .status(401)
        .json({ error: { message: "Campo nome obrigatorio." } });
    }

    if (!unitValue) {
      return res
        .status(401)
        .json({ error: { message: "Campo Valor unitario obrigatorio." } });
    }

    const product = await Product.create({ name, unit_value: unitValue });

    return res.json(product);
  }

  async edit(req, res) {
    const { name, unitValue } = req.body;
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res
        .status(401)
        .json({ error: { message: "Produto nao encontrado." } });
    }
    if (name) {
      product.name = name;
    }

    if (unitValue) {
      product.unitValue = unitValue;
    }

    await product.save();

    return res.json(product);
  }
}

module.exports = new ProductController();
