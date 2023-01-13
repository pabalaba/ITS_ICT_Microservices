import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import axios from "axios";
import { ICustomer,Customer } from "../entities/customer";

@Resolver()
export class CreateCustomer {

  @Mutation(() => Customer)
  async createCustomer(
    @Arg("name", () => String)
    name: string,
    @Arg("surname", () => String)
    surname: string,
    @Arg("address", () => String)
    address: string,
    @Arg("age", () => Int)
    age: number,
    @Arg("phone_number", () => String)
    phone_number: string
  ): Promise<ICustomer | null | GraphQLError> {
    try{
      try{
      const {data} =   
      await axios.post<ICustomer>(
        process.env.API_CUSTOMER || 'http://localhost:5001/api/customers',
        {
          "name": name,
          "surname": surname,
          "address": address,
          "age": age,
          "phone": phone_number
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },

      );
      return data;
      } catch (error) {
        return new GraphQLError('Error during the creation of a new customer');
      }
    } catch (error) {
      return new GraphQLError('Error');
    }
  }
}