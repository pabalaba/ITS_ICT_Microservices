import { Field, Int, Maybe, ObjectType } from "type-graphql";

export interface IBorrowRead {
  _id: string;
  id_book: number;
  id_customer: number;
  borrowing_date: string;
  returned: boolean;
}

@ObjectType()
export class BorrowRead{
  @Field(() => String)
  _id!: string;

  @Field(() => Int)
  id_book!: number;

  @Field(() => Int)
  id_customer!: Number;

  @Field(() => String)
  borrowing_date?: string;

  @Field(() => Boolean)
  returned?: boolean;
}