import type { Request, Response } from "express";
import { connectDB } from "./frameworks/database/mongo";
import app from "./frameworks/express/app";
import { config } from "./shared/config";

connectDB();



app.listen(config.port, () => console.log(`http://localhost:${config.port}`));
