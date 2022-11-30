import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { ICustomer,Customer } from "../entities/customer";
import axios from "axios";

const API_CUSTOMER = process.env.API_CUSTOMER;

@Resolver()
export class ListCustomers {

  @Query(() => [Customer!])
  async listCustomers(): Promise<ICustomer[] | GraphQLError> {
    try{
      const {data} = 
      await axios.get<ICustomer[]>(
        API_CUSTOMER || 'http://localhost:5001/api/customers',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}