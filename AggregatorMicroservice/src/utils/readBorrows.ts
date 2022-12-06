import axios from "axios";
import { IBorrowRead } from "../entities/borrowRead";

const API_BORROW = process.env.API_BORROW;

export default async (): Promise<Array<IBorrowRead>>  => {
  try{
    const {data} = 
      await axios.get<Array<IBorrowRead>>(
        API_BORROW || 'http://localhost:27112/api/borrows',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
  } catch (error) {
    return [];
  }
}