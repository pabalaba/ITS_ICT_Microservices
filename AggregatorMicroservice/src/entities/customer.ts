import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Customer{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String, {nullable: true})
  address: string;

  @Field(() => Int, {nullable: true})
  age: number;

  @Field(() => String, {nullable: true})
  phone_number: string;
}