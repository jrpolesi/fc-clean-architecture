import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();

    const productA = new Product("product-a", "Product A", 10);
    const productB = new Product("product-b", "Product B", 15);

    await productRepository.create(productA);
    await productRepository.create(productB);

    const useCase = new ListProductUseCase(productRepository);

    const result = await useCase.execute({});

    expect(result.products.length).toBe(2);
    expect(result.products[0]).toStrictEqual({
      id: productA.id,
      name: productA.name,
      price: productA.price,
    });
    expect(result.products[1]).toStrictEqual({
      id: productB.id,
      name: productB.name,
      price: productB.price,
    });
  });
});
