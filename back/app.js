import "./src/clients/db.js";
import express from "express";
import Boom from "boom";
import cors from "cors";
import routes from "./src/routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT || 5000, () => console.log("Server is up!"));
