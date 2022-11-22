import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import atlasConnection from './database/mongo-connection';
import logMiddleware from './middlewares/log.middleware';
import borrowRouter from './controllers/borrow.controller';
import notFoundMiddleware from './middlewares/notfound.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

(async () => {
  await atlasConnection();
})();

app.use(express.json());
app.use(logMiddleware);

app.use(borrowRouter);

app.use(notFoundMiddleware);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
