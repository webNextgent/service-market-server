import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { Application } from "express";
import cors from "cors";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://168.231.122.27:4000",
      "https://pest-control-eta.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/v1", router);

// Payment success page route (redirect from Ziina)
app.get("/payment-success", async (req: Request, res: Response) => {
  const { order, status } = req.query;

  if (status === "success") {

    return res.send("Payment Successful!");
  }

  res.send("Payment Failed or Cancelled");
});

app.get("/", (req: Request, res: Response) => {
  res.send("service-market start on vps!");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
