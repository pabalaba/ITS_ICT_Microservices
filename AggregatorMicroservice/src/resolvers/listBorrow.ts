import { Query, Resolver } from "type-graphql";
import axios from "axios";
import { Borrow } from "../entities/borrow";

type GetBorrowResponse = {
  data: Borrow[],
}

@Resolver()
export class ListBorrow {

  @Query(() => [Borrow])
  async listBorrow(): Promise<Borrow[]> {
    try{
      const {data} = 
      await axios.get<GetBorrowResponse>(
        'http://localhost:27112/api/borrows',
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