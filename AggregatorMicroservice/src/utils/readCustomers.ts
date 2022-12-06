import { ICustomer } from "../entities/customer";
import axios from "axios";

const API_CUSTOMER = process.env.API_CUSTOMER;

export default async (): Promise<Array<ICustomer>>  => {
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
  } catch (error) {
    return [];
  }
}