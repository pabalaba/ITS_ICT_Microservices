import { Query, Resolver } from "type-graphql";
import axios from "axios";
import { IBorrow,Borrow } from "../entities/borrow";
import { GraphQLError } from 'graphql';

@Resolver()
export class ListBorrows {

  @Query(() => [Borrow!])
  async listBorrows(): Promise<IBorrow[] | GraphQLError> {
    try{
      const {data} = 
      await axios.get<IBorrow[]>(
        'http://localhost:27112/api/borrows',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return await data;
    } catch (error) {
      return new GraphQLError('There was an error while fetching data from the server.');
    }
  }
}