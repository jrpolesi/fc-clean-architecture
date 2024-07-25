import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const useCase = new CreateProductUseCase(productRepository);

  try {
    const productDto = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
    };

    const createdProduct = await useCase.execute(productDto);

    res.status(200).send(createdProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (_: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const useCase = new ListProductUseCase(productRepository);

  const listOfProducts = await useCase.execute({});

  res.status(200).send(listOfProducts);
});
