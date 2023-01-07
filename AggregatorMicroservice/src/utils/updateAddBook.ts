import axios from "axios";

const API_BOOK = process.env.API_BOOK;

export default async (id: number): Promise<boolean>  => {
  try{
    const {status} = 
      await axios.put(
        API_BOOK+id || 'http://localhost:9999/api/books/quantity/add/'+id,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return status === 200;
  } catch (error) {
    return false;
  }
}