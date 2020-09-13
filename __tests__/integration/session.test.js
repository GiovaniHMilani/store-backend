const request = require("supertest");
const nodemailer = require("nodemailer");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factoris");

jest.mock("nodemailer");

const transport = {
  sendMail: jest.fn(),
};

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport);
  });

  it("Deve poder autenticar com credenciais válidas", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.status).toBe(200);
  });

  it("Não foi possível autenticar com credenciais inválidas", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123",
    });

    expect(response.status).toBe(401);
  });

  it("Não foi possível autenticar com emial inválido", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: "test@gmail.com",
      password: user.password,
    });

    expect(response.status).toBe(401);
  });

  it("Ele deve retornar o token jwt quando autenticado", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  });
});
