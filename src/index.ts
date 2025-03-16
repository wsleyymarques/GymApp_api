import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import index from "./routes"

const PORT = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
    const app = express()
    app.use(express.json())

   app.use(index)

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
})
