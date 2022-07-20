import express from 'express';
import {AppDataSource} from './data-source';
import routes from "./routes";

AppDataSource.initialize().then(() => { //Inicializando o banco de dados antes de configurarmos o express, evitando que qualquer chamada para a API seja realizada sem que o banco de dados seja inicializado.
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.get('/', (req, res) => {
        return res.json('Everything is OK.');
    })

    return app.listen(process.env.PORT);
})