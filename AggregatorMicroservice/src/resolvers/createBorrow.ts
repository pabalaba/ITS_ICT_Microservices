import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import axios from "axios";
import { IBorrow,Borrow } from "../entities/borrow";
import { IBook } from "../entities/book";
import { ICustomer } from "../entities/customer";

@Resolver()
export class CreateBorrow {

  @Mutation(() => Borrow)
  async createBorrow(
    @Arg("id_book", () => Int)
    id_book: number,
    @Arg("id_customer", () => Int)
    id_customer: number
  ): Promise<IBorrow | null | GraphQLError> {
    try{
      const book = await isBookPresent(id_book);
      const customer = await isCustomerPresent(id_customer);
      if(!book || !customer) {
        throw new Error;
      }

      try{
      const {data} =   
      await axios.post<IBorrow>(
        'http://localhost:27112/api/borrows',
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
      return data;
      } catch (error) {
        return new GraphQLError('Error during the creation of a new borrow');
      }
    } catch (error) {
      return new GraphQLError('Book or Customer not found');
    }
  }
}

const isBookPresent = async (book_id: number):Promise<boolean> => {
  const {status} = await axios.get<IBook>(
    'http://localhost:9999/api/books/'+book_id,
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
      'http://localhost:5001/api/customers/'+customer_id,
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