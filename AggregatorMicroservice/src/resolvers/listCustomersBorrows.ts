import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { CustomerBorrow } from "../entities/customerBorrows";
import axios from "axios";
import readCustomers from "../utils/readCustomers";
import readBorrows from "../utils/readBorrows";

const API_CUSTOMER = process.env.API_CUSTOMER;
const API_BORROW = process.env.API_BORROW;

@Resolver()
export class ListCustomersBorrows {

  @Query(() => [CustomerBorrow!])
  async listCustomersBorrows(): Promise<CustomerBorrow[] | GraphQLError> {
    try{
      var customerBorrows = new Array<CustomerBorrow>();
      var customers = await readCustomers();
      var borrows = await readBorrows();
      for(var c of customers){
        var cb = new CustomerBorrow();
        cb.customer = c;
        cb.borrows = borrows.filter(borrow => borrow.id_customer === c.id);
        customerBorrows.push(cb);
      }
      return customerBorrows;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}