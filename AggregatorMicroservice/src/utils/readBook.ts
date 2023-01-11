import { IBook } from "../entities/book";
import axios from "axios";

const API_BOOK = process.env.API_BOOK;

export default async (id: number): Promise<IBook | null>  => {
  try{
    const {data} = 
      await axios.get<IBook>(
        (API_BOOK || 'http://localhost:9999/api/books/')+id,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
  } catch (error) {
    return null;
  }
}