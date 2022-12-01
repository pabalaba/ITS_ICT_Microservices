import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { ICustomer,Customer } from "../entities/customer";
import { IBorrow,Borrow } from "../entities/borrow";
import { ICustomerBorrow,CustomerBorrow } from "../entities/customerBorrows";
import axios from "axios";

const API_CUSTOMER = process.env.API_CUSTOMER;
const API_BORROW = process.env.API_BORROW;

@Resolver()
export class ListCustomersBorrows {

  @Query(() => [CustomerBorrow!])
  async listCustomersBorrows(): Promise<ICustomerBorrow[] | GraphQLError> {
    try{
      var customerBorrows = new Array<ICustomerBorrow>();
      var customers = await getCustomers();
      var borrows = await getBorrows();
      for(var c of customers){
        var cb = new CustomerBorrow();
        cb.customer = c;
        cb.borrows = borrows.filter((b: { id_customer: number; }) => b.id_customer == c.id) || [];
        customerBorrows.push(cb);
      }
      return customerBorrows;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}

const getCustomers = async function(): Promise<Array<ICustomer>> {
  try{
    const {data} = 
      await axios.get<Array<ICustomer>>(
        API_CUSTOMER || 'http://localhost:5001/api/customers',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
  }catch (error) {
    throw new GraphQLError('There was an error while fetching data from the server.');
  }
}

const getBorrows = async function(): Promise<Array<IBorrow>> {
  try{
    const {data} = 
      await axios.get<Array<IBorrow>>(
        API_BORROW || 'http://localhost:27112/api/borrows',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
  }catch (error) {
    throw new GraphQLError('There was an error while fetching data from the server.');
  }
}