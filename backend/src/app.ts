import express from "express";
import { connectDB } from "./infrastructure/config/db";
import { authRouter } from "./api/router/auth-router";
import { errorHandler } from "./api/middleware/handle-error";
import { noteRouter } from "./api/router/note-router";
import { validateAuthorization } from "./api/middleware/validate-authorization";

const app = express();
const BASE_API_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_API_URL}/auth`, authRouter);
app.use(`${BASE_API_URL}/notes`, validateAuthorization, noteRouter);

app.use(errorHandler);

const PORT = 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening at http://localhost:${PORT}${BASE_API_URL}`
    );
  });
});
