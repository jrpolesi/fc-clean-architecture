import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("product-a", "Product A", 100);

const input = {
  id: product.id,
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
});

describe("Unit test for find product use case", () => {
  it("should find a product", async () => {
    const mockRepository = MockRepository();
    const useCase = new FindProductUseCase(mockRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
