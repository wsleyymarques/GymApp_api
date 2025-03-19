import express from 'express';
import { AppDataSource } from './data-source';
import index from "./routes";
import errorMiddleware from "./middlewares";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    app.use(index);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error("Erro ao inicializar o Data Source:", error);
});