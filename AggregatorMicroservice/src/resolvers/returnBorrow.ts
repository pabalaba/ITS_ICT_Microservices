import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import axios from "axios";
import { Borrow, IBorrow } from "../entities/borrow";
import updateAddBook from "../utils/updateAddBook";
import updateSubBook from "../utils/updateSubBook";
import readCustomer from "../utils/readCustomer";
import readBook from "../utils/readBook";

@Resolver()
export class ReturnBorrow {

  @Mutation(() => Borrow)
  async returnBorrow(
    @Arg("id_borrow", () => String)
    id_borrow: string
  ): Promise<Borrow | null | GraphQLError> {
    try{
        const {data,status} = await axios.put('http://localhost:27112/api/borrows/return/'+id_borrow);
        var success;
        if(status==200){
          success = await updateAddBook(data.id_book);
        }
        if(!success){
          await axios.put('http://localhost:27112/api/borrows/'+id_borrow,{
            "returned": false,
          });
          return new GraphQLError('Error while updateBook');
        }
        var borrow = new Borrow();
        var c = await readCustomer(data.id_customer);
        var b = await readBook(data.id_book);
        if(c==null || b==null){
          await axios.put('http://localhost:27112/api/borrows/'+id_borrow,{
            "returned": false,
          });
          await updateSubBook(data.id_book);
          return new GraphQLError('Error while updateBook');
        }
        
        borrow.customer = c;
        borrow.book = b;
        borrow._id = data._id;
        borrow.returned = data.returned;
        borrow.borrowing_date = data.borrowing_date;
        return borrow;
    } catch (error) {
      return new GraphQLError('Book or Customer not found');
    }
    return null;
  }
}