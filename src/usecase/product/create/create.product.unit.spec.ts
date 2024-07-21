import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product A",
  price: 15.5,
  type: "a",
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
});

describe("Unit test for product create use case", () => {
  it("should create a product", async () => {
    const mockRepository = MockRepository();
    const useCase = new CreateProductUseCase(mockRepository);

    const output = await useCase.execute(input);

    expect(mockRepository.create).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
