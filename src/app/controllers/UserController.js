const { User } = require("../models");
class UserControler {
  async store(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: { message: "Email, senha e nome sao obrigatorios" } });
    }

    const user = await User.create({ email, password, name });

    delete user.password;
    delete user.password_hash;

    return res.json(user);
  }
}

module.exports = new UserControler();
