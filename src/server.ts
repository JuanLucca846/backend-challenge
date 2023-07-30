import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "./errors/AppError";
import clientRoutes from "./routes/client.routes";

const prisma = new PrismaClient();
const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(clientRoutes);
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.msg,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${err.message}`,
  });
});

server.listen(port, () => {
  console.log(`Connected ${port}`);
});

export default server;
