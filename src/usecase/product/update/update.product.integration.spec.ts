import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("product-a", "Product A", 1.99);

    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product A Updated",
      price: 2.99,
    };

    const output = {
      id: product.id,
      name: "Product A Updated",
      price: 2.99,
    };

    const result = await useCase.execute(input);
    expect(result).toStrictEqual(output);
  });
});
