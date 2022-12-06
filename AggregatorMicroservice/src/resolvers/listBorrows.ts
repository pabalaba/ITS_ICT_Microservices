import { Query, Resolver } from "type-graphql";
import axios from "axios";
import { IBorrow,Borrow } from "../entities/borrow";
import { GraphQLError } from 'graphql';
import { IBorrowRead } from "../entities/borrowRead";
import readBooks from "../utils/readBooks";
import readCustomers from "../utils/readCustomers";
import readBorrows from "../utils/readBorrows";

@Resolver()
export class ListBorrows {

  @Query(() => [Borrow!]!)
  async listBorrows(): Promise<Borrow[] | GraphQLError> {
    try{

      const borrowsRead = await readBorrows();
      const books = await readBooks();
      const customers = await readCustomers();

      const borrows = new Array<Borrow>();

      for (let k of borrowsRead) {
        let b = books.find(book => book.id === k.id_book);
        if(!b)
          continue;
        let c = customers.find(customer => customer.id === k.id_customer);
        if(!c)
          continue;
        const borrow = new Borrow();
        borrow._id = k._id;
        borrow.borrowing_date = k.borrowing_date;
        borrow.returned = k.returned;
        borrow.book = b;
        borrow.customer = c;
        borrows.push(borrow);
      }
      return borrows;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}