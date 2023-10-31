import express from "express";
import { router } from "./routes/routes.js";
import { AppError } from "./errors/index.js";
import { globalErrorHandle } from "./errors/error.controller.js";
const app = express();

app.use(express.json())

//routes
app.use('/api/v1', router)

app.all('*', (req,res,next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`,404))
})
//TODO: hacer todas las 300 lineas de codigo de los snippets 
app.use(globalErrorHandle)

export default app;