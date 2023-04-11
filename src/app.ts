import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./configs/dbConnection.config";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ status_code: 200, message: "Server is started" });
});

// IMPORT RESOURCES
import userResources from "./routes/user.routes";
import authResources from "./routes/auth.routes";
import productResources from "./routes/product.routes";

// DEFINE ENDPOINT
app.use("/v1/auth", authResources);
app.use("/v1/users", userResources);
app.use("/v1/products", productResources);

app.listen(port || 3001, () => {
  console.log(`\x1b[32m[Server] Server Connected on port ${port}\x1b[0m`);
  connectToMongoDB();
});

export default app;
