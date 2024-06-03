import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", (req: Request, res: Response) => {
  res.json("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
