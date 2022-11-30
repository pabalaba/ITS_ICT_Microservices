import { Arg, Int, Mutation, Resolver } from "type-graphql";
import axios from "axios";
import { Borrow } from "../entities/borrow";

type GetBorrowResponse = {
  data: Borrow,
}

@Resolver()
export class CreateBorrow {

  @Mutation(() => Borrow!)
  async createBorrow(
    @Arg("id_book", () => Int)
    id_book: number,
    @Arg("id_customer", () => Int)
    id_customer: number,
    @Arg("borrowing_date", () => String, {nullable: true})
    borrowing_date: string,
    @Arg("returned", () => Boolean, {nullable: true})
    returned: boolean
  ): Promise<Borrow | null> {
    try{
      const {data} = 
      await axios.post<GetBorrowResponse>(
        'http://localhost:27112/api/borrows',
        {
          "id_book": id_book,
          "id_customer": id_customer,
          "borrowing_date": borrowing_date,
          "returned": returned
        },
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
    return null;
  }
}