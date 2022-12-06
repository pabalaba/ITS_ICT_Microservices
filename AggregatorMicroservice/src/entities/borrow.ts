import { Field, ObjectType } from "type-graphql";
import { Book, IBook } from "./book";
import { Customer, ICustomer } from "./customer";

export interface IBorrow {
  _id: string;
  book: IBook;
  customer: ICustomer;
  borrowing_date: string;
  returned: boolean;
}

@ObjectType()
export class Borrow{
  @Field(() => String)
  _id!: string;

  @Field(() => Book)
  book!: IBook;

  @Field(() => Customer)
  customer!: ICustomer;

  @Field(() => String)
  borrowing_date?: string;

  @Field(() => Boolean)
  returned?: boolean;
}