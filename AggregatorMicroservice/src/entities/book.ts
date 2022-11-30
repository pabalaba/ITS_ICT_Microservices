import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Book{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  author: string;

  @Field(() => Int, {nullable: true})
  pages: number;

  @Field(() => String, {nullable: true})
  publication_date: string;

  @Field(() => Int)
  quantity: number;
}