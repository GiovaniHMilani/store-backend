const bcrypt = require("bcryptjs")

const factory = require("../factoris")
const trucate = require("../utils/truncate")

describe("User", () => {
  beforeEach(async () => {
    await trucate()
  })

  it("Deve criptografar a senha do usuário", async () => {
    const user = await factory.create("User", {
      password: "123"
    })

    const compareHash = await bcrypt.compare("123", user.password_hash)

    expect(compareHash).toBe(true)
  })
})
