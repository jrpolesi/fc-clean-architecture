import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("product-a", "Product A", 100);

const input = {
  id: product.id,
  name: "Product A Updated",
  price: 200,
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
});

describe("Unit test for update product use case", () => {
  it("should update a product", async () => {
    const mockRepository = MockRepository();
    const useCase = new UpdateProductUseCase(mockRepository);

    const output = await useCase.execute(input);

    expect(mockRepository.update).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });
});
