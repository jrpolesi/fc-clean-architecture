import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product A",
      type: "a",
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: "Product A",
      price: 10,
    });
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product A",
      price: 10,
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const responseCreate1 = await request(app).post("/product").send({
      name: "Product A",
      type: "a",
      price: 10,
    });
    const responseCreate2 = await request(app).post("/product").send({
      name: "Product B",
      type: "b",
      price: 20,
    });

    expect(responseCreate1.status).toBe(200);
    expect(responseCreate2.status).toBe(200);

    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);

    expect(response.body.products[0]).toStrictEqual({
      id: expect.any(String),
      name: "Product A",
      price: 10,
    });
    expect(response.body.products[1]).toStrictEqual({
      id: expect.any(String),
      name: "Product B",
      price: 40,
    });
  });
});
