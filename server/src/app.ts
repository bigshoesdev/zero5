import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import carRoutes from "./routes";
import db from "./config/database";
import path from "path";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(carRoutes);
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../public")));

db.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
