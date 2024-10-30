import express from "express";
const app = express();
const port = 3010;
import cors from "cors";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import productRoutes from "./routes/product-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import userRoutes from "./routes/user-route.js";
import connection from "./database/db.js";
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/product", productRoutes(connection));
app.use("/api/cart", cartRoutes(connection));
app.use("/api/user", userRoutes(connection));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});