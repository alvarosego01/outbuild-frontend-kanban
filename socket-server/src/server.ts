
import express, { Express } from "express";
import routes from "./routes";
import LoggerService from "./core/utils/logger";
import http from "http";
import { initializeSocket } from "./sockets";



export const server = async (): Promise<Express> => {
    const app: Express = express();
    const port = 3150;

    const logger = new LoggerService("server");

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use("/", routes);

    const httpServer = http.createServer(app);
    initializeSocket(httpServer);

    httpServer.listen(port, () => {
        logger.info(`Server-socket is running at http://localhost:${port}`);
    });

    return app;
};