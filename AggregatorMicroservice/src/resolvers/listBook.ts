import { Query, Resolver } from "type-graphql";
import { Book } from "../entities/book";
import axios from "axios";

type GetBooksResponse = {
  data: Book[],
}

@Resolver()
export class ListBooks {

  @Query(() => [Book])
  async listBook(): Promise<Book[]> {
    try{
      const {data} = 
      await axios.get<GetBooksResponse>(
        'http://localhost:9999/api/books',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return await data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
    return [];
  }
}