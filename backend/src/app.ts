import express from "express";
import { connectDB } from "./infrastructure/config/db";
import { authRouter } from "./api/router/auth-router";
import { errorHandler } from "./api/middleware/handle-error";
import { noteRouter } from "./api/router/note-router";
import { validateAuthorization } from "./api/middleware/validate-authorization";
import cors from "cors";
import { noteVersionRouter } from "./api/router/note-version-router";
import { collaborationRouter } from "./api/router/collaboration-router";

const app = express();
const BASE_API_URL = "/api/v1";

const corsOptions = {
  origin: "https://noted-tawny.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you're sending cookies or auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Yes server is working and all results should be success",
    });
});

app.use(`${BASE_API_URL}/auth`, authRouter);
app.use(`${BASE_API_URL}/notes`, validateAuthorization, noteRouter);
app.use(
  `${BASE_API_URL}/noteversions`,
  validateAuthorization,
  noteVersionRouter
);
app.use(`${BASE_API_URL}/collaborations`, validateAuthorization, collaborationRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening at http://localhost:${PORT}${BASE_API_URL}`
    );
  });
});
