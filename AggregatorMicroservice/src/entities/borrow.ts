import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Borrow{
  @Field(() => String)
  id?: string;

  @Field(() => Int)
  id_book!: number;

  @Field(() => Int)
  id_customer!: number;

  @Field(() => String)
  borrowing_date?: string;

  @Field(() => Boolean)
  returned?: boolean;
}