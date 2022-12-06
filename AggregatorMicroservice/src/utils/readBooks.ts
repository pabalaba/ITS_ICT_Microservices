import { IBook } from "../entities/book";
import axios from "axios";

const API_BOOK = process.env.API_BOOK;

export default async (): Promise<Array<IBook>>  => {
  try{
    const {data} = 
      await axios.get<Array<IBook>>(
        API_BOOK || 'http://localhost:9999/api/books',
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