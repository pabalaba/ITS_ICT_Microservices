import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ListBooks } from "./resolvers/listBooks";
import { ListBorrows } from "./resolvers/listBorrows";
import { ListCustomers } from "./resolvers/listCustomers";
import { ListCustomersBorrows } from "./resolvers/listCustomersBorrows";
import { CreateBorrow } from "./resolvers/createBorrow";
import { CreateCustomer } from "./resolvers/createCustomer";

dotenv.config();
  
const PORT = process.env.PORT;

const main = async () => {

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
                  ListBooks,
                  ListBorrows,
                  ListCustomers,
                  ListCustomersBorrows,
                  CreateBorrow,
                  CreateCustomer
                ],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    debug: false
  })
  await apolloServer.start();
  const app: Express = express();
  apolloServer.applyMiddleware({app});

  app.get('/', (req, res) => { 
    res.send("YO"); 
  });

  app.listen(PORT || 9997,()=>{
    console.log("The server is listening on port " + PORT);
  });
}

main().catch(err => { console.error(err); });