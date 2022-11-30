import { Field, Int, ObjectType } from "type-graphql";
import { ICustomer,Customer } from "./customer";
import { IBorrow,Borrow } from "./borrow";

export interface ICustomerBorrow {
  customer: ICustomer;
  borrows: [IBorrow];
}

@ObjectType()
export class CustomerBorrow{
  @Field(() => Customer!)
  customer!: ICustomer;

  @Field(() => [Borrow])
  borrows?: [IBorrow];
}