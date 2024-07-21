import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create("a", "Product A", 100);
const productB = ProductFactory.create("b", "Product B", 200);

const input = {};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
  find: jest.fn(),
  update: jest.fn(),
});

describe("Unit test for product list use case", () => {
  it("should list products", async () => {
    const mockRepository = MockRepository();
    const useCase = new ListProductUseCase(mockRepository);

    const output = await useCase.execute(input);
    expect(output.products).toStrictEqual([
      {
        id: productA.id,
        name: productA.name,
        price: productA.price,
      },
      {
        id: productB.id,
        name: productB.name,
        price: productB.price,
      },
    ]);
  });
});
