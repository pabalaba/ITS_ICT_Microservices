import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import axios from "axios";
import { IBorrow,Borrow } from "../entities/borrow";
import { IBook } from "../entities/book";
import { ICustomer } from "../entities/customer";
import updateSubBook from "../utils/updateSubBook";
import updateAddBook from "../utils/updateAddBook";
import { IBorrowRead } from "../entities/borrowRead";
import readBook from "../utils/readBook";
import readCustomer from "../utils/readCustomer";

@Resolver()
export class CreateBorrow {

  @Mutation(() => Borrow)
  async createBorrow(
    @Arg("id_book", () => Int)
    id_book: number,
    @Arg("id_customer", () => Int)
    id_customer: number
  ): Promise<Borrow | null | GraphQLError> {
    try{
      const book = await isBookPresent(id_book);
      const customer = await isCustomerPresent(id_customer);
      if(!book || !customer) {
        throw new Error;
      }

      const success = await updateSubBook(id_book);
      if(!success){
        throw new Error;
      }

      try{
      const {data} =   
      await axios.post<IBorrowRead>(
        process.env.API_BORROW  || 'http://localhost:27112/api/borrows',
        {
          "id_book": id_book,
          "id_customer": id_customer
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },

      );
      console.log(data)
      var borrow = new Borrow();
      var c = await readCustomer(id_customer);
      var b = await readBook(id_customer);
      
      console.log(borrow,c,b);

      if(!c || !b) {
        await axios.delete((process.env.API_BORROW  || 'http://localhost:27112/api/borrows/')+data._id);
        await updateAddBook(id_book);
        throw new Error;
      }

      borrow._id = data._id;
      borrow.borrowing_date = data.borrowing_date;
      borrow.returned = data.returned;
      borrow.book = b;
      borrow.customer = c;

      return borrow;
      } catch (error) {
        await updateAddBook(id_book);
        return new GraphQLError('Error during the creation of a new borrow');
      }
    } catch (error) {
      return new GraphQLError('Book or Customer not found');
    }
  }
}

const isBookPresent = async (book_id: number):Promise<boolean> => {
  const {status} = await axios.get<IBook>(
    (process.env.API_BOOK || 'http://localhost:9999/api/books/')+book_id,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if(status==200){
    return true;
  }
  return false;
}

const isCustomerPresent = async (customer_id: number):Promise<boolean> => {
  try{
    const {status} = await axios.get<ICustomer>(
      (process.env.API_CUSTOMER || 'http://localhost:5001/api/customers/')+customer_id,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if(status==200)
      return true;
  }catch (err){}
  return false;
}