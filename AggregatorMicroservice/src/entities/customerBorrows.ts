import { Field, Int, ObjectType } from "type-graphql";
import { ICustomer,Customer } from "./customer";
import { BorrowRead, IBorrowRead } from "./borrowRead";

export interface ICustomerBorrow {
  customer: ICustomer;
  borrows: IBorrowRead[];
}

@ObjectType()
export class CustomerBorrow{
  @Field(() => Customer!)
  customer!: ICustomer;

  @Field(() => [BorrowRead])
  borrows?: IBorrowRead[];
}