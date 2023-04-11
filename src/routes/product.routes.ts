import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Product from "../models/product.models";
import { checkErrors, checkIdValid } from "../middlewares/utils.middleware";
import jwt from "jsonwebtoken";
import { body, header } from "express-validator";
import { IProdcut } from "../interface/product.interface";
const routes = express();
dotenv.config();

const secret_key = String(process.env.KEY);

routes.use(express.json());

// GET
routes.get("/", async (req: Request, res: Response) => {
  try {
    const findAll = await Product.find({});
    if (findAll) {
      return res.status(200).json(findAll);
    }
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
});

routes.get("/:id", checkIdValid, async (req: Request, res: Response) => {
  try {
    const findByID = await Product.findById(res.locals.id);
    if (findByID) {
      return res.status(200).json(findByID);
    }
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
});

// POST
routes.post(
  "/",
  header("token").isJWT(),
  checkErrors,
  async (req: Request, res: Response) => {
    const auth = String(req.headers.token);
    try {
      const checkValidToken = jwt.verify(auth, secret_key);
      if (checkValidToken) {
        const newProduct: IProdcut = {
          name: req.body.name,
          typology: req.body.typology,
          brand: req.body.brand,
          model: req.body.model,
          price: req.body.price,
          stock: req.body.stock,
        };
        try {
          const createProduct = await Product.create(newProduct);
          if (createProduct) {
            return res
              .status(201)
              .json({ message: "Product created", newProduct });
          }
          return res.status(400).json({ message: "Error to create product" });
        } catch (error) {
          return res.status(400).json({ error_message: error });
        }
      }
    } catch (error) {
      return res.status(400).json({ error_message: error });
    }
  }
);

// PUT
routes.put("/:id", (req: Request, res: Response) => {});

// DELETE
routes.delete("/:id", (req: Request, res: Response) => {});

export default routes;
