import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { IBook,Book } from "../entities/book";
import axios from "axios";

@Resolver()
export class ListBooks {

  @Query(() => [Book!])
  async listBooks(): Promise<IBook[] | GraphQLError> {
    try{
      const {data} = 
      await axios.get<IBook[]>(
        'http://localhost:9999/api/books',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}