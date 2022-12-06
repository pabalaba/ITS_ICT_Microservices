import { Field, Int, ObjectType } from "type-graphql";

export interface IBook {
  id: number;
  title: string;
  author: string;
  pages: number;
  publication_date: string;
  quantity: number;
}

@ObjectType()
export class Book{
  @Field(() => Int)
  id?: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  author!: string;

  @Field(() => Int, {nullable: true})
  pages?: number;

  @Field(() => String, {nullable: true})
  publication_date?: string;

  @Field(() => Int)
  quantity!: number;
}