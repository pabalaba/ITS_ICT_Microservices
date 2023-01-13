import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import axios from "axios";
import { Book, IBook } from "../entities/book";

@Resolver()
export class CreateBook {

  @Mutation(() => Book)
  async createBook(
    @Arg("title", () => String)
    title: string,
    @Arg("author", () => String)
    author: string,
    @Arg("pages", () => Int)
    pages: number,
    @Arg("quantity", () => Int)
    quantity: number,
    @Arg("publication_date", () => String)
    publication_date: string
  ): Promise<IBook | null | GraphQLError> {
    try{
      try{
      const {data} =   
      await axios.post<IBook>(
        process.env.API_BOOK || 'http://localhost:9999/api/books',
        {
          "title": title,
          "author": author,
          "pages": pages,
          "quantity": quantity,
          "publication_date": publication_date
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },

      );
      return data;
      } catch (error) {
        return new GraphQLError('Error during the creation of a new book');
      }
    } catch (error) {
      return new GraphQLError('Error');
    }
  }
}