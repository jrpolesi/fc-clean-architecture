import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("123", "Product A", 20);
    await productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await useCase.execute(input);
    expect(result).toStrictEqual(output);
  });
});
