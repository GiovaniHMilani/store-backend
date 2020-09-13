const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: { message: "Usuario não encontrado" } });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: { message: "As senhas não batem" } });
    }

    const { name } = user;

    return res.json({
      name,
      token: await user.generateToken(),
    });
  }
}

module.exports = new SessionController();
