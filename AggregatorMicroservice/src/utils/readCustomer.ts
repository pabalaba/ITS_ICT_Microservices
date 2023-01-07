import { ICustomer } from "../entities/customer";
import axios from "axios";

const API_CUSTOMER = process.env.API_CUSTOMER;

export default async (id: number): Promise<ICustomer | null>  => {
  try{
    const {data} = 
      await axios.get<ICustomer>(
        API_CUSTOMER+id || 'http://localhost:5001/api/customers/'+id,
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