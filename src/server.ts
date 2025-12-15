import type { Request, Response } from "express";
import { connectDB } from "./frameworks/database/mongo/index.js";
import app from "./frameworks/express/app.js";
import { config } from "./shared/config.js";

connectDB();



app.listen(config.port, () => console.log(`http://localhost:${config.port}`));
