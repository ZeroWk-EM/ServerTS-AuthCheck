import { Schema, model } from "mongoose";
import { IProdcut } from "../interface/product.interface";

const ProductSchema = new Schema<IProdcut>(
  {
    name: { type: String, required: true },
    typology: {
      type: String,
      enum: {
        values: ["Smartphone", "Tablet", "PC", "TV"],
        message:
          "{VALUE} is not supported, Accept only  Smartphone or Tablet or PC or TV",
      },
      required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model<IProdcut>("products", ProductSchema);
