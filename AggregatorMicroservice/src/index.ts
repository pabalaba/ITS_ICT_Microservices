import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import { ListBooks } from "./resolvers/listBook";
import { ListBorrow } from "./resolvers/listBorrow";
import { CreateBorrow } from "./resolvers/createBorrow";

dotenv.config();
  
const PORT = process.env.PORT;

const main = async () => {

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [await ListBooks,
                  await ListBorrow,
                  await CreateBorrow],
      validate: false
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })
  await apolloServer.start();
  const app: Express = express();
  apolloServer.applyMiddleware({app});

  app.get('/', (req, res) => { 
    res.send("YO"); 
  });

  app.listen(PORT,()=>{
    console.log("The server is listening on port " + PORT);
  });
}

main().catch(err => { console.error(err); });