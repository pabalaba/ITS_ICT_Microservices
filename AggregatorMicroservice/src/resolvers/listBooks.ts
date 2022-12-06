import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { IBook,Book } from "../entities/book";
import readBooks from "../utils/readBooks";

@Resolver()
export class ListBooks {

  @Query(() => [Book!])
  async listBooks(): Promise<IBook[] | GraphQLError> {
    try{
      return await readBooks();
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}