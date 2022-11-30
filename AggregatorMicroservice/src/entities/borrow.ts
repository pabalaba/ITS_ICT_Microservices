import { Field, Int, ObjectType } from "type-graphql";

export interface IBorrow {
  _id: string;
  id_book: number;
  id_customer: number;
  borrowing_date: string;
  returned: boolean;
}

@ObjectType()
export class Borrow{
  @Field(() => String)
  _id!: string;

  @Field(() => Int)
  id_book!: number;

  @Field(() => Int)
  id_customer!: number;

  @Field(() => String)
  borrowing_date?: string;

  @Field(() => Boolean)
  returned?: boolean;
}