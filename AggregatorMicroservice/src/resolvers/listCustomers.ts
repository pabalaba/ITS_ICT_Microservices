import { Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import { ICustomer,Customer } from "../entities/customer";
import readCustomers from "../utils/readCustomers";

@Resolver()
export class ListCustomers {

  @Query(() => [Customer!])
  async listCustomers(): Promise<ICustomer[] | GraphQLError> {
    try{
      return await readCustomers();
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}